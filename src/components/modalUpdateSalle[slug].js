import React from "react";
import { Chip, TextInput } from "@mantine/core";
import { Button, Space, Modal, NumberInput } from "@mantine/core";
import { Group, LoadingOverlay ,Checkbox} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "@mantine/form";

const UPDATE_SALLE = gql`
mutation UpdateSalle($data: UpdateSalleInput) {
    updateSalle(data: $data) {
      id
    }
  }
`;

function ModalUpdateSalle({salle}) {
  const [visible, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
        id:salle.id,
      nbr_chaises :salle.nbr_chaises,
      acces_handicape : salle.acces_handicape,
      micro : salle.micro,
      video_projecteur : salle.video_projecteur,
      sound_proof :salle.sound_proof,
      climatiseur: salle.climatiseur,
      image:salle.image
    },

    
  });

  const [Update_Salle, { data, loading, error }] = useMutation(UPDATE_SALLE);
  if (error) return <p>Error: {error.message}</p>;

function handleFormSubmit(values){
    console.log(values)
Update_Salle({
    variables: { data:{
        id:salle.id,
      nbr_chaises: values.nbr_chaises,
      acces_handicape: values.acces_handicape,
      micro: values.micro,
      video_projecteur: values.video_projecteur,
      sound_proof: values.sound_proof,
      climatiseur: values.climatiseur,
      image :values.image
    }
    },})  
}

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Modifier une salle">
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          
          <NumberInput
            withAsterisk
            label="Numero de chaises"
            {...form.getInputProps("nbr_chaises")}
          />

        <Checkbox
          mt="md"
          label="acces handicape"
          {...form.getInputProps('acces_handicape', { type: 'checkbox' })}
        />
        <Checkbox
          mt="md"
          label="micro"
          {...form.getInputProps('micro', { type: 'checkbox' })}
        />
        <Checkbox
          mt="md"
          label="video projecteur"
          {...form.getInputProps('video_projecteur', { type: 'checkbox' })}
        />
        <Checkbox
          mt="md"
          label="climatiseur"
          {...form.getInputProps('climatiseur', { type: 'checkbox' })}
        />
        <Checkbox
          mt="md"
          label="sound proof"
          {...form.getInputProps('sound_proof', { type: 'checkbox' })}
        />
        <TextInput
            withAsterisk
            label="image"
            {...form.getInputProps("image")}
          />

          <Group position="center">
          {loading ? (
       <LoadingOverlay visible={visible} overlayBlur={2} />
      ) : (
            <Button type="submit" onClick={close}>
              Enregistrer
            </Button>)}
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button type="submit" onClick={open}>
         Modifier
        </Button>
      </Group>
    </div>
  );
}
export default ModalUpdateSalle;

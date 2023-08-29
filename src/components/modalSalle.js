import React from "react";
import { Chip, TextInput } from "@mantine/core";
import { Button, Space, Modal, NumberInput } from "@mantine/core";
import { Group, LoadingOverlay ,Checkbox} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "@mantine/form";

const CREATE_SALLE = gql`
  mutation CreateSalle($data: CreateSalleInput) {
    createSalle(data: $data) {
      etage
      num_salle
      nbr_chaises
      acces_handicape
      micro
      video_projecteur
      sound_proof
      climatiseur
      image
    }
  }
`;

function ModalSalle() {
  const [visible, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      etage: 1,
      num_salle: 1,
      nbr_chaises :0,
      acces_handicape : false,
      micro : false,
      video_projecteur : false,
      sound_proof :false,
      climatiseur: false,
      image:""
    },

    
  });

  const [Create_Salle, { data, loading, error }] = useMutation(CREATE_SALLE);
  if (error) return <p>Error: {error.message}</p>;

function handleFormSubmit(values){
    console.log(values)
// etage= values.etage;
// num_salle= values.num_salle;
// nbr_chaises= values.nbr_chaises;
// acces_handicape = values.acces_handicape;
// micro = values.micro;
// video_projecteur = values.video_projecteur;
// sound_proof = values.sound_proof;
// climatiseur = values.climatiseur;
Create_Salle({
    variables: { data:{
      etage: values.etage,
      num_salle: values.num_salle,
      nbr_chaises: values.nbr_chaises,
      acces_handicape: values.acces_handicape,
      micro: values.micro,
      video_projecteur: values.video_projecteur,
      sound_proof: values.sound_proof,
      climatiseur: values.climatiseur,
      image :values.image
    }
    },})  
    console.log(data);
}

  return (
    <div>
      <Modal opened={opened} onClose={close} title="Ajouter une salle">
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          <NumberInput
            withAsterisk
            label="Etage"
            {...form.getInputProps("etage")}
          />
          <NumberInput
            withAsterisk
            label="Num de salle"
            {...form.getInputProps("num_salle")}
          />
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
            <Button type="submit" onClick={toggle}>
              Enregistrer
            </Button>)}
          </Group>
        </form>
      </Modal>

      <Group position="center">
        <Button type="submit" onClick={open}>
          Ajouter
        </Button>
      </Group>
    </div>
  );
}
export default ModalSalle;

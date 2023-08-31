import React from "react";
import { useRouter } from "next/router";
import { useMutation, gql ,useQuery } from "@apollo/client";
import { DateTimePicker } from "@mantine/dates";
import { Modal, Group, Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

const CREATE_RESERVATION = gql`
  mutation Mutation($data: CreateReservationInput) {
    createReservation(data: $data) {
      id
    }
  }
`;

export default function newReservation({salleId}) {
  const router = useRouter();
  const [visible, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      salleId: "",
      userId: "",
      etat: false,
      date_heure: "",
    },
  });

  const [Create_Reservation, { loading, error }] = useMutation(CREATE_RESERVATION);
  if (error) return <p>Error: {error.message}</p>;

  

  function handleFormSubmit(values) {
    console.log("date",values.date_heure)
    const data = {
      salleId,
      userId: "25", //TODO
      etat: true,
      date_heure: values.date_heure.toISOString().replace('T', ' ').substr(0, 19),
    };
    console.log("Cheerss", data);

    Create_Reservation({
      variables: { data: data },
    });
  }
  
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Reserver">
        <div style={{ minHeight: "55vh", overflowY: "auto" }}>
          <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
             <DateTimePicker
              label="Pick date and time"
              placeholder="Pick date and time"
              maw={400}
              mx="auto"
            {...form.getInputProps("date_heure")}/>

            <Group position="center">
              {loading ? (
                <LoadingOverlay visible={visible} overlayBlur={2} />
              ) : (
                <Button type="submit" onClick={close}>
                  Enregistrer
                </Button>
              )}
            </Group>
          </form>
        </div>
      </Modal>

      <Group position="center">
        
      <Button type="submit" onClick={open}>
        reserver
      </Button>

      </Group>
    </div>
  );
}

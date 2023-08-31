import React from "react";
import { useRouter } from "next/router";
import { useMutation, gql  } from "@apollo/client";
import { DateTimePicker } from "@mantine/dates";
import { Modal, Group, Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

const UPDATE_RESERVATION = gql`
mutation Mutation($data: UpdateReservationInput) {
    updateReservation(data: $data) {
      id
    }
  }
`;

export default function updateReservation({reservationId ,dateR}) {
  const router = useRouter();
  const [visible, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
        id:"",
      date_heure: "",
    },
  });
  const [Update_Reservation, { loading, error,data }] = useMutation(UPDATE_RESERVATION);
  if (error) return <p>Error: {error.message}</p>;


  function handleFormSubmit(values) {
    console.log("date",values.date_heure)
    const data = {
        id:reservationId,
      date_heure: values.date_heure.toISOString().replace('T', ' ').substr(0, 19),
    };
    Update_Reservation({
      variables: { data: data },
    });
  }
  return (
    <div>
      <Modal opened={opened} onClose={close} title="Modifier">
        <div style={{ minHeight: "55vh", overflowY: "auto" }}>
          <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
             <DateTimePicker
              label="Pick date and time"
              placeholder={dateR}
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
        Modifier
      </Button>

      </Group>
    </div>
  );
}

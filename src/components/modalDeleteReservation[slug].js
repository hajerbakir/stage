import React from "react";
import { useRouter } from "next/router";
import { useMutation, gql  } from "@apollo/client";
import { DateTimePicker } from "@mantine/dates";
import { Modal, Group, Button, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

const DELETE_RESERVATION = gql`
mutation Mutation($deleteReservationId: ID!) {
    deleteReservation(id: $deleteReservationId) {
      id
    }
  }
`;

export default function deleteReservation({reservationId }) {
  const router = useRouter();
  const [visible, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);


  const [Delete_Reservation, { loading, error,data }] = useMutation(DELETE_RESERVATION);
  if (error) return <p>Error: {error.message}</p>;


    Delete_Reservation(reservationId);
  
  return (
    <div>
   
      <Group position="center">
        
      <Button type="submit" onClick={open}>
       supprimer
      </Button>

      </Group>
    </div>
  );
}

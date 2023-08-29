import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import { Space , Loader } from '@mantine/core';

const GET_RESERVATIONS = gql`
  query GetReservations {
    getReservations {
      id
      date_heure
      etat
      user {
        id
        username
        password
        email
        isAdmin
        image
      }
      salle {
        id
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
  }
`;

function test() {
  //const router = useRouter();//  <p>Post: {router.query.slug}</p>
  const { loading, error, data } = useQuery(GET_RESERVATIONS);
  console.log({ data });

  if (error) return <p>Error: {error.message}</p>;

  const reservations = data?.getReservations;

  return (
    <div>
      <h2>List</h2>
      {loading ? (
        <Loader/>
      ) : (
        <ul>
          {reservations?.map((reservation) => (
            <li key={reservation.id}>
              <strong>Id:</strong> {reservation.id}, <strong>date:</strong>{" "}
              {reservation.date_heure}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default test;

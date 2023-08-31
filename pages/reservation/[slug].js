import React from "react";
import { useQuery, gql ,useMutation} from "@apollo/client";
import { useRouter } from "next/router";
import { Space , Loader ,Card ,Group, Badge ,Button,Text,Image,Divider} from '@mantine/core';
import ModalUpdateReservation from "../../src/components/ModalUpdateReservation[slug]";
import ModalDeleteReservation from "../../src/components/ModalDeleteReservation[slug]";

const GET_RESERVATION = gql`
query GetReservation($getReservationId: ID!) {
  getReservation(id: $getReservationId) {
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

const DELETE_RESERVATION = gql`
mutation Mutation($deleteReservationId: ID!) {
    deleteReservation(id: $deleteReservationId) {
      id
    }
  }
`;

function test() {
  const router = useRouter();  
  const { loading, error, data } = useQuery(GET_RESERVATION ,{
    variables: { getReservationId: router.query.slug }
  });
  const [Delete_Reservation, { error:error2 }] = useMutation(DELETE_RESERVATION);
  if (error2) return <p>Error: {error2.message}</p>;
  
  

  if (error) return <p>Error: {error.message}</p>;

  const reservation = data?.getReservation;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2  style={{ textAlign: 'center' }}>RESERVATION</h2>
      {loading ? (
        <Loader/>
      ) : (
        <ul >
          
        <Card style={{ width: '600px' }} shadow="sm" padding="lg" radius="md" withBorder>
              
        
        <Group position="apart" mt="md" mb="xs">
                <Badge color={reservation.etat ? 'green' : 'red'} variant="light">
                    {reservation.etat ? 'reservé' : 'archive'}
                  </Badge>
                <Text size="sm" color="dimmed">
                {reservation.date_heure}
              </Text>
              </Group> 
        
              <Divider my="sm" />
              <Card.Section>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> Salle :</Text>
                       <Image
                         src={reservation.salle.image}
                         height={350}
                         caption={
                         <>
                           etage:  {reservation.salle.etage }
                           <br/>
                         num salle: {reservation.salle.num_salle}
                         <br/>
                         nombre de chaise: {reservation.salle.nbr_chaises}
                         {reservation.salle.micro && <Text size="sm">micro</Text>}
                         {reservation.salle.video_projecteur && <Text size="sm">video projecteur</Text>}
                         {reservation.salle.sound_proof && <Text size="sm">sound proof</Text>}
                         {reservation.salle.climatiseur && <Text size="sm">climatiseur</Text>}
                         {reservation.salle.acces_handicape && <Text size="sm">vacces handicape</Text>}
                        </>
                         }
                       />
                     </Card.Section>

                     <Divider my="sm" />
                     <Text style={{ fontWeight: 'bold', textAlign: 'center' }}> User :</Text>
                     <Card.Section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                       <Image
                         src={reservation.user.image}
                         height={200}
                         width ={200}
                         
                         caption={
                           <>
                           name: {reservation.user.username}
                           <br/>
                           email: {reservation.user.email}
                           </>
                         }
                       />
                     </Card.Section>
                     <ModalUpdateReservation reservationId={reservation.id} dateR={reservation.date_heure}  />
                     {/* <ModalDeleteReservation reservationId={reservation.id} /> */}
            <Group position="center">
            <Button
          color="red" type="submit"
          onClick={() => Delete_Reservation(reservation.id)}
        >
          Delete
        </Button>
        </Group>
            </Card>
       
        </ul>
      )}
    </div>
  );
}
export default test;

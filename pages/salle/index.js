import React from 'react'
import Head from "next/head";
import MenuApp from "../../src/components/Menu";
import ModalSalle from "../../src/components/modalSalle";
import { Space } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { Loader } from '@mantine/core';
import { useQuery, gql } from "@apollo/client";
import { Image } from '@mantine/core';
import { Grid , Card ,Group, Badge,Text, LoadingOverlay} from '@mantine/core';



const GET_SALLES = gql`
query GetSalles {
    getSalles {
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
    }  } `;

export default function Salles() {
    const [opened, { open, close }] = useDisclosure(false);
    const { loading, error, data } = useQuery(GET_SALLES);
    if (error) return <p>Error: {error.message}</p>;
    const salles = data?.getSalles;

  return (
    <div>
     <Head>
        <title>Front</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>

      <main >
        
        
      <Space h="md" />
      <MenuApp />

      <ModalSalle/>
    

      <h2 style={{ textAlign: 'center' }}>List des salles :</h2>
      
      {loading ? (
        <Loader/>
      ) : (
        <ul><Grid   gutterXl={25}>
          {salles?.map((salle) => (
            
                <Grid.Col key={salle.id} md={6} lg={3}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                  <Image
                    src={salle.image}
                    height={160}
                  />
        
              </Card.Section>
              
              <Text size="sm">
                etage : {salle.etage}
              </Text>
              <Text size="sm">
                num salle : {salle.num_salle}
              </Text>
              <Text size="sm">
                nbr chaises : {salle.nbr_chaises}
              </Text>
              
              {salle.micro ? (
            <Text size="sm" >micro</Text>
                ) : <Text td="line-through">micro</Text>}
                {salle.video_projecteur ? (
            <Text size="sm">video_projecteur</Text>
                ) : <Text td="line-through">vide projecteur</Text>}
                {salle.sound_proof ? (
            <Text size="sm">sound_proof</Text>
                ) : <Text td="line-through">sound proof</Text>}
                {salle.climatiseur ? (
            <Text size="sm">climatiseur</Text>
                ) : <Text td="line-through">climatiseur</Text>}
                {salle.acces_handicape ? (
            <Text size="sm">acces_handicape</Text>
                ) : <Text td="line-through">acces handicape</Text>}
              
        
              </Card>
              </Grid.Col>
              
              ))}</Grid>
              </ul>
              
            )}
                  
          
   



      </main>
    </div>
  )
}
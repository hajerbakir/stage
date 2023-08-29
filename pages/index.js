import Head from "next/head";
import { Chip } from "@mantine/core";
import { Group } from "@mantine/core";
import { Space, Button, Modal, NumberInput } from "@mantine/core";
import MenuApp from "../src/components/Menu";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Front</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Space h="md" />
        <MenuApp />

        <Space h="md" />

        <Space h="md" />

        <Modal opened={opened} onClose={close} title="Ajouter une salle">
          <Chip.Group multiple>
            <Group position="center" mt="md">
              <Chip value="1">acces andicape</Chip>
              <Chip value="2">micro</Chip>
              <Chip value="3">video projecteur</Chip>
              <Chip value="4">climatiseur</Chip>
              <Chip value="5">sound proof</Chip>
            </Group>
          </Chip.Group>
          <NumberInput defaultValue={1} label="etage" withAsterisk />
          <NumberInput defaultValue={1} label="numero de salle" withAsterisk />
          <NumberInput
            defaultValue={20}
            label="numero de chaises"
            withAsterisk
          />
          <Space h="md" />
          <Space h="md" />
          <Group position="center">
            <Button>Enregistrer</Button>
          </Group>
        </Modal>

        <Group position="center">
          <Button onClick={open}>Ajouter</Button>
        </Group>

      </main>
    </div>
  );
}

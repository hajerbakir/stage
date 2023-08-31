import { Drawer ,Box , Divider,Image,Group,Button, NavLink  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

function MenuApp() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter()

  return <div>
      <Drawer  size="xs" opened={opened} onClose={close} overlayProps={{ opacity: 0.5, blur: 4 }}>

  <Image maw={240} mx="auto" radius="md" 
          src="https://images.unsplash.com/photo-1627552245715-77d79bbf6fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
          alt="image"  caption="username" />

  <Divider my="sm" />
  <Box component="a"  >
  <Link href="Profile" >Profile</Link>
  </Box>


  <Divider my="sm" />
<Box component="a"  >
  <Link href="/">Salles</Link>
</Box>


  <Divider my="sm" />
  <Box component="a" >
  <Link  href="/reservation" >Reservations</Link>
  </Box>
  </Drawer>

  <Group position="left" >
        <Button onClick={open}>Menu</Button>
      </Group>

  </div>;
}

export default MenuApp;

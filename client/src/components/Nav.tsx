import { Button, SimpleGrid  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
  <SimpleGrid columns={4} spacing={10}>
    <Button variant='outline'>
      <Link to='/dashboard'>
        Dashboard
      </Link>
    </Button>

    <Button variant='outline'>
      <Link to='/dashboard/create-test-data'>
        Create Test Data
      </Link>
    </Button>

    <Button variant='outline'>
      <Link to='/dashboard/user-accounts'>
        User Accounts
      </Link>
    </Button>

    <Button variant='outline'>
      <Link to='/dashboard/waves'>
        Waves
      </Link>
    </Button>
  </SimpleGrid>
      )
}

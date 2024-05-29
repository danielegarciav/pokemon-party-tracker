import { DrawerRoot } from './components/Drawer';
import { PageHeader } from './components/PageHeader';
import { PokemonTable } from './components/PokemonTable';

export default function App() {
  return (
    <DrawerRoot>
      <div>
        <PageHeader />
        <PokemonTable />
      </div>
    </DrawerRoot>
  );
}

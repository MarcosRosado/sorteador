import {Tabs} from '@/components/tabs';
import ListInput from '@/components/listInput';

export default async function RaffleItems() {
  return (
    <Tabs defaultValue="all">
      <div className="mt-4">
        <ListInput />
      </div>
    </Tabs>
  );
}
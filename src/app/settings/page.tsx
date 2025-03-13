import {Tabs} from '@/components/tabs';
import RaffleItemsInput from '@components/raffleItemsInput';

export default async function RaffleItems() {
  return (
    <Tabs defaultValue="all">
      <div className="mt-4">
        <RaffleItemsInput />
      </div>
    </Tabs>
  );
}
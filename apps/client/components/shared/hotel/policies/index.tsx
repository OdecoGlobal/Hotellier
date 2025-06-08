'use client';
import { useForm } from 'react-hook-form';
import HotelCreationSteps from '../creation-steps';
import z from 'zod';
import { hotelPolicySchema } from '@hotellier/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { selectTime, timesNextDay } from '@/lib/utils';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const IndexPolicyForm = ({ hotelId }: { hotelId: string }) => {
  console.log(hotelId);

  const [noCheckInTime, setNoCheckInTime] = useState(false);

  const form = useForm<z.infer<typeof hotelPolicySchema>>({
    resolver: zodResolver(hotelPolicySchema),
    defaultValues: {
      checkInEndTime: '',
    },
  });

  const onSubmit = (values: z.infer<typeof hotelPolicySchema>) => {
    console.log(values);
  };

  const handleNoCheckInTime = (checked: boolean) => {
    setNoCheckInTime(checked);
    if (checked) {
      form.setValue('checkInStartTime', '00:00');
      form.setValue('checkInEndTime', '00:00');
    }
  };

  return (
    <section className=" flex flex-col md:flex-row border border-red-500 ">
      <div>
        <HotelCreationSteps current={1} />
      </div>
      <div className=" border flex-1 max-w-md mx-auto py-10 px-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-">
              <div
                className={`grid grid-cols-2 gap-4 ${
                  noCheckInTime ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <FormField
                  control={form.control}
                  name="checkInStartTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        disabled={noCheckInTime}
                        value={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {selectTime.map(time => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.text}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkInEndTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ''}
                        disabled={noCheckInTime}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {timesNextDay.map(time => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.text}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="noCheckInTime"
                  checked={noCheckInTime}
                  onCheckedChange={handleNoCheckInTime}
                />
                <Label htmlFor="noCheckInTime"> No check in time</Label>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default IndexPolicyForm;

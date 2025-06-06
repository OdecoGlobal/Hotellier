'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  getAllCountries,
  getCitiesByState,
  getStateByCountry,
} from '@/lib/actions/location.action';
import { CityData, CountryData, StateData } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import debounce from 'debounce';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { hotelBasicInfoStepTwoSchema } from '@/lib/validator';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const extendedSchema = hotelBasicInfoStepTwoSchema.extend({
  countryId: z.string().optional(),
  stateId: z.string().optional(),
});

type LocationFormValues = z.infer<typeof extendedSchema>;

const HotelBasicInfoStepTwo = ({
  defaultValues,
  onNext,
  onPrevious,
}: {
  defaultValues?: LocationFormValues;
  onNext: (data: LocationFormValues) => void;
  onPrevious: (data: LocationFormValues) => void;
}) => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [loading, setLoading] = useState({
    countries: true,
    states: false,
    cities: false,
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const form = useForm<LocationFormValues>({
    resolver: zodResolver(extendedSchema),
    defaultValues: defaultValues,
  });

  const selectedCountry = form.watch('countryId');
  const selectedState = form.watch('stateId');

  const loadCountries = useCallback(async () => {
    setLoading(prev => ({ ...prev, countries: true }));

    try {
      const data = await getAllCountries(searchQuery);
      setCountries(data.data.countries);
    } catch (error) {
      console.log('Error fetching countries', error);
    } finally {
      setLoading(prev => ({ ...prev, countries: false }));
    }
  }, [searchQuery]);

  useEffect(() => {
    const debouncedFetch = debounce(loadCountries, 100);
    debouncedFetch();

    return () => debouncedFetch.clear();
  }, [loadCountries]);

  useEffect(() => {
    const loadStates = async () => {
      if (!selectedCountry) return;
      form.setValue('state', '');
      form.setValue('city', '');
      setStates([]);
      setCities([]);
      setLoading(prev => ({ ...prev, states: true }));
      try {
        const data = await getStateByCountry(
          selectedCountry,
          stateSearchQuery,
          36
        );
        setStates(data.data.states);
      } catch (error) {
        console.log('Error fetching states', error);
      } finally {
        setLoading(prev => ({ ...prev, states: false }));
      }
    };
    loadStates();
  }, [stateSearchQuery, selectedCountry, form]);

  useEffect(() => {
    const loadCities = async () => {
      if (!selectedState) return;
      form.setValue('city', '');

      setCities([]);
      setLoading(prev => ({ ...prev, cities: true }));
      try {
        const data = await getCitiesByState(selectedState, citySearchQuery);
        setCities(data.data.cities);
      } catch (error) {
        console.log('Error fetching states', error);
      } finally {
        setLoading(prev => ({ ...prev, cities: false }));
      }
    };
    loadCities();
  }, [citySearchQuery, selectedState, form]);

  return (
    <Card className="justify-self-center self-center w-full max-w-lg my-4 px-4">
      <p className="text-muted-foreground font-semibold">Step 2 of 3</p>
      <h1 className="text-xl md:text-2xl font-bold">Property Address</h1>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onNext)}>
          {/* COUNTRY */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Country</FormLabel>
                <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={`w-full justify-between ${
                          !field.value && 'text-muted-foreground'
                        }`}
                      >
                        {field.value
                          ? countries.find(
                              country => country.name === field.value
                            )?.name
                          : 'Select Country'}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent>
                    <Command>
                      <CommandInput
                        placeholder="Search Countries"
                        className="h-9"
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {loading.countries
                            ? 'Loading...'
                            : 'No country found'}
                        </CommandEmpty>
                        <CommandGroup>
                          {countries.map(country => (
                            <CommandItem
                              key={country.name}
                              value={country.name}
                              onSelect={() => {
                                form.setValue('country', country.name);
                                form.setValue('countryId', country.id);
                                setDropdownOpen(false);
                              }}
                            >
                              {country.name}

                              <Check
                                className={`ml-auto ${
                                  country.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* STATES */}
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>State</FormLabel>
                <Popover
                  open={stateDropdownOpen}
                  onOpenChange={setStateDropdownOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={`w-full justify-between ${
                          !field.value && 'text-muted-foreground'
                        }`}
                      >
                        {field.value
                          ? states.find(state => state.name === field.value)
                              ?.name
                          : 'Select State'}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent>
                    <Command>
                      <CommandInput
                        placeholder="Search States"
                        className="h-9"
                        value={stateSearchQuery}
                        onValueChange={setStateSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {loading.states ? 'Loading...' : 'No state found'}
                        </CommandEmpty>
                        <CommandGroup>
                          {states.map(state => (
                            <CommandItem
                              key={state.id}
                              value={state.name}
                              onSelect={() => {
                                form.setValue('state', state.name);
                                form.setValue('stateId', state.id);
                                setStateDropdownOpen(false);
                              }}
                            >
                              {state.name}

                              <Check
                                className={`ml-auto ${
                                  state.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* CITIES */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>City</FormLabel>
                <Popover
                  open={cityDropdownOpen}
                  onOpenChange={setCityDropdownOpen}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={`w-full justify-between ${
                          !field.value && 'text-muted-foreground'
                        }`}
                      >
                        {field.value
                          ? cities.find(city => city.name === field.value)?.name
                          : 'Select City'}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent>
                    <Command>
                      <CommandInput
                        placeholder="Search state"
                        className="h-9"
                        value={citySearchQuery}
                        onValueChange={setCitySearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {loading.cities ? 'Loading...' : 'No cities found'}
                        </CommandEmpty>
                        <CommandGroup>
                          {cities.map(city => (
                            <CommandItem
                              key={city.id}
                              value={city.name}
                              onSelect={() => {
                                form.setValue('city', city.name);
                                setStateDropdownOpen(false);
                              }}
                            >
                              {city.name}

                              <Check
                                className={`ml-auto ${
                                  city.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Address */}

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel> Street Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your street address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel> Zip Code</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your zip code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button onClick={() => onPrevious(form.getValues())}>
              Previous
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default HotelBasicInfoStepTwo;

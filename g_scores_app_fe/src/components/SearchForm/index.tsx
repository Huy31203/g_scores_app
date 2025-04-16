import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { studentService } from '@/services/studentService';
import { IStudent } from '@/types';
import logError from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type SearchFormProps = {
  onStudentFound: (student: IStudent) => void;
};

const formSchema = z.object({
  registration_number: z
    .string()
    .length(8, 'Registration number must be 8 digits'),
});

export function SearchForm({ onStudentFound }: SearchFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registration_number: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await studentService.getStudentByRegistration(
        values.registration_number
      );
      onStudentFound(res.data);
    } catch (error) {
      logError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="registration_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter registration number"
                    {...field}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className=""
                    variant="default"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    ) : (
                      <Search className="h-4 w-4 mr-2" />
                    )}
                    Search
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

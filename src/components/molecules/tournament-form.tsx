import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  tournamentId: z.string().cuid("Invalid tournament ID"),
});

const TournamentForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tournamentId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { tournamentId } = values;
    navigate(`/tournament/${tournamentId}`);
  };

  return (
    <div className="flex flex-col my-auto text-center gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-start">
          <FormField
            control={form.control}
            name="tournamentId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Tournament ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Connect</Button>
        </form>
        <p className="text-sm text-muted-foreground">
          You can also use the "Open Desktop" button on the tournament page.
        </p>
      </Form>
    </div>
  );
};

export default TournamentForm;

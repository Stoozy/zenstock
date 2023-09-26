"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog } from "@/components/ui/dialog";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useDeleteModal } from "@/hooks/use-delete-modal";
import prismadb from "@/lib/prismadb";
import { warehouse } from "@prisma/client";
import axios from "axios";
import { Check, Save, Trash, Warehouse } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ZodError, ZodIssue, z } from "zod";

interface SettingsFormProps {
  data: warehouse;
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const alertsFormSchema = z.object({
  phone: z.string().regex(phoneRegex, "Invalid number"),
  email: z.string().email(),
  emailNotify: z.boolean(),
  phoneNotify: z.boolean(),
});

const SettingsForm: React.FC<SettingsFormProps> = ({ data }) => {
  const deleteModal = useDeleteModal();

  const [name, setName] = useState(data.name);
  const [alertsForm, setAlertsForm] = useState({
    phone: data.number,
    email: data.email,
    emailNotify: data.notify.includes("EMAIL"),
    phoneNotify: data.notify.includes("SMS"),
  });

  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ZodIssue[]>([]);

  // const [smsEnabled, setSmsEnabled] = useState(data.notify.includes("SMS"));
  // const [emailEnabled, setEmailEnabled] = useState(
  //   data.notify.includes("EMAIL")
  // );

  const deleteWarehouse = () => {
    console.log("Delete modal called back!");
  };

  const nameSubmit = async () => {
    try {
      setLoading(true);
      z.string().min(1).parse(name);

      const body = {
        ...data,
        name,
      };
      const response = await axios.put("/api/warehouses", body);
      window.location.assign(`/${response.data.id}/settings`);
    } catch (err) {
      if (err instanceof ZodError) {
        setNameError("Invalid name");
      }
    } finally {
      setLoading(false);
    }
  };
  const alertsSubmit = async () => {
    try {
      alertsFormSchema.parse(alertsForm);
      setErrors([]);
      setLoading(true);

      let notify = [];
      if (alertsForm.phoneNotify) notify.push("SMS");
      if (alertsForm.emailNotify) notify.push("EMAIL");

      const body: warehouse = {
        ...data,
        notify,
        email: alertsForm.email,
        number: alertsForm.phone,
      };

      const response = await axios.put("/api/warehouses", body);
      window.location.assign(`/${response.data.id}/settings`);
    } catch (err) {
      if (err instanceof ZodError) {
        setErrors(err.issues);
      } else {
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-col">
      <Heading title="Warehouse" description="Manage warehouse settings" />
      <Separator></Separator>

      <div className="flex flex-row py-4 gap-4 items-center max-w-sm">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          defaultValue={data.name}
          className="row-span-1 text-left"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>
        <Button variant="outline" disabled={loading} onClick={nameSubmit}>
          <Save></Save>
        </Button>

        <Button
          variant="destructive"
          disabled={loading}
          onClick={() => {
            deleteModal.setCallback(deleteWarehouse);
            deleteModal.onOpen(
              `This will delete the ${data.name} warehouse and all data associated with it.`
            );
          }}
        >
          <Trash className="text-sm"></Trash>
        </Button>
      </div>

      <div className="text-sm text-red-500">{nameError}</div>

      <div className="pt-6">
        <Heading title="Alerts" description="Manage alerts settings"></Heading>
        <Separator></Separator>
        <div className="flex items-center space-x-4 max-w-sm pt-6">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            defaultValue={data.email}
            onChange={(e) => {
              setAlertsForm({ ...alertsForm, email: e.target.value });
            }}
          ></Input>
        </div>

        <div className="flex space-x-2 items-center pt-2">
          <Checkbox
            id="email-alerts"
            checked={alertsForm.emailNotify}
            onCheckedChange={() => {
              setAlertsForm({
                ...alertsForm,
                emailNotify: !alertsForm.emailNotify,
              });
            }}
          ></Checkbox>
          <Label htmlFor="email-alerts">Allow email alerts</Label>
        </div>

        <div className="flex items-center space-x-4 max-w-sm pt-6">
          <Label htmlFor="number">Number</Label>
          <Input
            id="number"
            type="tel"
            defaultValue={data.number}
            onChange={(e) => {
              setAlertsForm({
                ...alertsForm,
                phone: e.target.value,
              });
            }}
          ></Input>
        </div>
        <div className="flex space-x-2 items-center pt-2">
          <Checkbox
            id="sms-alerts"
            checked={alertsForm.phoneNotify}
            onCheckedChange={() => {
              setAlertsForm({
                ...alertsForm,
                phoneNotify: !alertsForm.phoneNotify,
              });
            }}
          ></Checkbox>
          <Label htmlFor="sms-alerts">Allow sms alerts</Label>
        </div>

        <div className="flex flex-col space-y-1 pt-4">
          {errors.map((e) => {
            return (
              <div className="text-sm text-red-500" key={errors.indexOf(e)}>
                {e.message}
              </div>
            );
          })}
        </div>
        <div className="pt-2">
          <Button onClick={() => alertsSubmit()} disabled={loading}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;

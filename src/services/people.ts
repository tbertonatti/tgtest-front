/* eslint-disable */
import Person from "@/models/person";
import { HttpGet, HttpPost } from "./http";
const baseUrl = "/people";

export const GetPeople: () => Promise<Person[]> = () =>
    HttpGet(`${baseUrl}/all`);

export const DeletePerson: (id: string) => Promise<any> = (id: string) =>
    HttpGet(`${baseUrl}/delete/${id}`);

export const CreatePerson: (person: Person) => Promise<any> = (person: Person) =>
    HttpPost(`${baseUrl}/add`, person);

export const UpdatePerson: (id: string, person: Person) => Promise<any> = (
    id: string,
    person: Person
) => HttpPost(`${baseUrl}/update/${id}`, person);

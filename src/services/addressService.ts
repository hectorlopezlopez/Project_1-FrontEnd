import { Address } from "../models/Address";

const API_BASE_URL = 'http://localhost:8080';

export const createAddress = async (data:{
    country: string;
    state: string;
    city: string;
    street: string;
    streetNum: string;
    zip: string;
}) => {
    return await fetch(`${API_BASE_URL}/address`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(data),
    });
};

export const getMyAddress = async () => {
    return await fetch (`${API_BASE_URL}/address/myAddress`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
    });
};

export const getAllAddress = async () => {
    return await fetch (`${API_BASE_URL}/address`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
    });
};

export const getAddressById = async (id: number) => {
    return await fetch (`${API_BASE_URL}/address/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
    });
};

export const updateMyAddress = async (addressData: Address): Promise<Response> => {
  return await fetch(`${API_BASE_URL}/address/myAddress`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(addressData),
  });
};

export const updateAddress = async (id: number, data: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    streetNum?: string;
    zip?: string;
}) => {
    return await fetch(`${API_BASE_URL}/address/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
};


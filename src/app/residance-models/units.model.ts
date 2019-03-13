import { Tenant } from './tenant.model';
export class Unit {
    _id: string;
    name: string;
    unit_identifier: string;
    floor :string;
    PublishedBy: string;
    tenant_id: string;
    tenant: Tenant = new Tenant();
}
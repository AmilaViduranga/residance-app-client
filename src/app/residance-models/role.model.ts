export class Role {
    _id: string;
    menus: Array<Menu> = new Array<Menu>();
    name: string;
    crud: Map<string, boolean>;
}

export class Menu {
    name: string;
    isInsert: boolean = false;
    isUpdate: boolean = false;
    isDelete: boolean = false;
    isView: boolean = false;
    canEditOthers:boolean = false;
    canViewOthers:boolean = false;
    canInsertOthers:boolean = false;
    canDeleteOthers:boolean = false;
}
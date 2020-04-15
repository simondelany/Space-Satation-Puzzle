interface CareerPosition {
    title: string;
}

export interface Person {
    uuid: string,
    status: string,
    title: string,
    firstName: string,
    lastName: string,
    transferTime: number,
    location: number,
    position: CareerPosition,
    selected?: boolean
}

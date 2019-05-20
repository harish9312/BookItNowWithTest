import Axios from 'axios';
import { TicketModel } from '../Models/TicketModel';

const data = require('../data.json');

export async function getAllTicketData() {
    new TicketModel(data).$save();
}

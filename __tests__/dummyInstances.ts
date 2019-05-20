import { BookedTicketModel } from '../src/Models/BookedTicketsModel';
import { TicketModel } from '../src/Models/TicketModel';
export function getBookedModelInstance(showName = 'Badla') {
    return new BookedTicketModel({
        id: showName, bookedTickets: [{ B4: true, isSelected: false, isBooked: true, price: 280 },
        { B5: true, isSelected: false, isBooked: true, price: 280 },
        { A5: true, isSelected: false, isBooked: true, price: 280 },
        { C5: true, isSelected: false, isBooked: true, price: 280 }]
    })
}

export function saveDummyBookedTicketInstance(showName) {
    new BookedTicketModel({
        id: showName, bookedTickets: [{ B4: true, isSelected: false, isBooked: true, price: 280 },
        { B5: true, isSelected: false, isBooked: true, price: 280 },
        { A5: true, isSelected: false, isBooked: true, price: 280 },
        { C5: true, isSelected: false, isBooked: true, price: 280 }]
    }).$save();
}

export function getTicketModelInstance(showName = 'Badla') {
    return new TicketModel({
        id: showName,
        showData: [
            {
                descText: "Show 1 Running in Audi 1:",
                movieName: "Kesari",
                imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Kesari_poster.jpg/220px-Kesari_poster.jpg"
            }
        ],
        ticketData: [
            {
                descText: "Show 1 Running in Audi 1:",
                movieName: "Kesari",
                imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Kesari_poster.jpg/220px-Kesari_poster.jpg"
            }
        ],
    })
}

export function saveDummyTicketInstance(showName) {
    return new TicketModel({
        id: showName,
        showData: [
            {
                descText: "Show 1 Running in Audi 1:",
                movieName: "Kesari",
                imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Kesari_poster.jpg/220px-Kesari_poster.jpg"
            }
        ],
        ticketData: [
            {
                descText: "Show 1 Running in Audi 1:",
                movieName: "Kesari",
                imgSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Kesari_poster.jpg/220px-Kesari_poster.jpg"
            }
        ],
    }).$save();
}

export function getDummyShowDetails() {
    return JSON.parse(`[{"A1":true},{"A2":true},{"A3":true},{"A4":true},{"A5":true},{"A6":true},{"A7":true},{"A8":true},{"A9":true},{"B1":true},{"B2":true},{"B3":true},{"B4":true},{"B5":true},{"B6":true},{"B7":true},{"B8":true},{"B9":true},{"C1":true},{"C2":true},{"C3":true},{"C4":true},{"C5":true},{"C6":true},{"C7":true},{"C8":true},{"C9":true}]`)
}

export function getSingleDummyShowDetails() {
    return JSON.parse(`[{"A1":true, "isBooked":"true"}]`)
}

export function getSingleSelectedDummyShowDetails() {
    return JSON.parse(`[{"A1":true, "isSelected": "true" , "isBooked":"true"}]`)
}

export function getBookedTicketInstance() {
    return JSON.parse(`[{"A1":true, "isBooked":true}]`)
}

export function getNotSelectedTicketInstance() {
    return JSON.parse(`[{"A1":true, "isSelected":false}]`)
}

describe('Dummy test', () => {
    it('Should pass the test', () => {
        expect((2 + 1)).toEqual(3);
    })
})
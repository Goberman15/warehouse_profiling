import jsPDF from 'jspdf';
import accounting from 'accounting-js';
import 'jspdf-autotable';
import Logo from '../assets/Logo_SPL.jpeg';
import CKB from '../assets/Logo_CKB.png';
import moment from 'moment';

const blcGenerator = (doc, column, row, count, totalPrice) => {
    doc.setFontSize(16);
    doc.addImage(CKB, 'PNG', 10, 10, 50, 30);
    doc.text('Bounded Logistic Center Surabaya', 108, 20);
    doc.addImage(Logo, 'PNG', 235, 10, 50, 30);
    doc.line(10, 45, 287, 45);
    doc.text('WAREHOUSE CALCULATION RESULT', 100, 52);
    doc.line(10, 55, 287, 55);
    doc.setFontSize(10);
    doc.text(`Date Release: ${moment(new Date()).format('DD/MM/YYYY')}`, 10, 62)
    doc.autoTable(column, row, {
        startY: 65,
        theme: 'grid',
        styles: {
            fontSize: 9,
            minCellWidth: 1
        },
        didParseCell: (data) => {
            if (data.row.index === count) {
                if (data.column.index === 0) {
                    data.cell.colSpan = 12
                } else if (data.column.index === 12) {
                    data.cell.text[0] = accounting.formatMoney(+totalPrice, { symbol: 'Rp', precision: 0, thousand: '.', decimal: ',' })
                }
                
            }
        }
    });
    doc.setFontSize(12);
    doc.text('Calculate By:', 180, 165);
    doc.line(180, 185, 267, 185);
    doc.text('Signature By Receipient/Date:', 180, 190);
}

const hubGenerator = (doc, column, row, count, totalPrice) => {
    doc.setFontSize(16);
    doc.addImage(CKB, 'PNG', 10, 10, 60, 30);
    doc.text('NON BLC / HUB SURABAYA', 112, 20);
    doc.addImage(Logo, 'PNG', 225, 10, 60, 30);
    doc.line(10, 45, 287, 45);
    doc.text('WAREHOUSE CALCULATION RESULT', 100, 52);
    doc.line(10, 55, 287, 55);
    doc.setFontSize(10);
    doc.text(`Date Release: ${moment(new Date()).format('DD/MM/YYYY')}`, 10, 62)
    doc.autoTable(column, row, {
        startY: 65,
        theme: 'grid',
        styles: {
            fontSize: 9,
            minCellWidth: 1
        },
        didParseCell: (data) => {
            if (data.row.index === count) {
                if (data.column.index === 0) {
                    data.cell.colSpan = 16
                } else if (data.column.index === 16) {
                    data.cell.text[0] = accounting.formatMoney(+totalPrice, { symbol: 'Rp', precision: 0, thousand: '.', decimal: ',' })
                }
                
            }
        }
    });
    doc.setFontSize(12);
    doc.text('Calculate By:', 180, 165);
    doc.line(180, 185, 267, 185);
    doc.text('Signature By Receipient/Date:', 180, 190);
}

export const pdfGenerator = (items, cartId, type) => {
    const doc = new jsPDF({
        orientation: 'landscape'
    }); 

    const columnBlc = ['No', 'Type Goods', 'Warehouse Type\n& Location', 'Quantity',
                    'Total\nArea\n(M2)', 'Total\nVolume', 'Total\nWeight\n(Kg)',
                    'Total\nStack', 'Total\nPallet', 'Handling', 'Storage', 'Level',
                    'Cost'];

    const columnHub = ['No', 'Type Goods', 'Warehouse Type\n& Location', 'Quantity',
                    'Total\nArea\n(M2)', 'Total\nVolume', 'Total\nWeight\n(Kg)',
                    'Total\nStack', 'Total\nPallet', 'Handling', 'Storage', 'Level',
                    'Consumption\nStorage', 'Cost', 'Added\nServices', 'Added\nCost', 'Total\nCost'];

    const rowBlc = [];
    const rowHub = [];
    let blcCount = 0;
    let hubCount = 0;
    let blcTotalPrice = 0;
    let hubTotalPrice = 0;

    items.forEach((item, idx) => {
        if (item.warehouse_type === 'BLC') {
            blcCount++;
            blcTotalPrice += +item.cost;
            rowBlc.push([
                blcCount,
                item.type,
                `${item.warehouse_type} / ${item.storage_location}`,
                item.quantity,
                Number(item.total_area).toFixed(2),
                Number(item.volume).toFixed(2),
                item.weight,
                item.stack_per_bin || '-',
                item.total_pallet || '-',
                item.handling,
                item.location,
                item.level || '-',
                accounting.formatMoney(+item.cost, { symbol: 'Rp', precision: 0, thousand: '.', decimal: ',' })
            ])
        } else {
            hubCount++;
            hubTotalPrice += +item.total_cost;
            rowHub.push([
                hubCount,
                item.type,
                `${item.warehouse_type} / ${item.storage_location}`,
                item.quantity,
                Number(item.total_area).toFixed(2),
                Number(item.volume).toFixed(2),
                item.weight,
                item.stack_per_bin || '-',
                item.total_pallet || '-',
                item.handling,
                item.location,
                item.level || '-',
                Math.ceil(Number(item.consumption_storage)),
                accounting.formatMoney(+item.cost, { symbol: 'Rp', precision: 0, thousand: '.', decimal: ',' }),
                item.added_services || '-',
                accounting.formatMoney(+item.added_cost, { symbol: 'Rp', precision: 0, thousand: '.', decimal: ',' }),
                accounting.formatMoney(+item.total_cost, { symbol: 'Rp', precision: 0, thousand: '.', decimal: ',' }),
            ])
        }
    })

    rowBlc.push(['Total Price']);
    rowHub.push(['Total Price']);

    const date = new Date();

    if ((!type && blcCount) || type === 'BLC') {
        blcGenerator(doc, columnBlc, rowBlc, blcCount, blcTotalPrice);
    }

    if (!type && (blcCount && hubCount)) {
        doc.addPage('a4', 'l');
    }
    
    if ((!type && hubCount) || type === 'NON-BLC') {
        hubGenerator(doc, columnHub, rowHub, hubCount, hubTotalPrice);
    }

    doc.save(`Inquiry Customer CKB - ${cartId} ${date.toISOString().substring(0,11)}.pdf`);
};
import jsPDF from 'jspdf';

const generateReport = (filteredServiceData) => {
    const doc = new jsPDF();

    // Define CSS styles
    const styles = {
        header: {
            fontSize: 18,
            fontStyle: 'bold',
            textColor: [0, 0, 0],
        },
        sectionTitle: {
            fontSize: 14,
            fontStyle: 'bold',
            textColor: [0, 0, 0],
        },
        content: {
            fontSize: 12,
            textColor: [0, 0, 0],
        },
    };

    let yOffset = 20;

    // Add header
    doc.setFont(styles.header.fontStyle, 'bold');
    doc.setFontSize(styles.header.fontSize);
    doc.setTextColor(...styles.header.textColor);
    doc.text('Refund Report', 105, yOffset, 'center');
    yOffset += 20;

    // Iterate over the filteredServiceData and append data to the report
    filteredServiceData.forEach((item, index) => {
        // Add section title
        doc.setFont(styles.sectionTitle.fontStyle, 'bold');
        doc.setFontSize(styles.sectionTitle.fontSize);
        doc.setTextColor(...styles.sectionTitle.textColor);
        doc.text(`Entry ${index + 1}:`, 10, yOffset);

        // Add content
        doc.setFont(styles.content.fontStyle);
        doc.setFontSize(styles.content.fontSize);
        doc.setTextColor(...styles.content.textColor);
        yOffset += 10;
        doc.text(`Product ID: ${item.productID}`, 15, yOffset);
        yOffset += 10;
        doc.text(`Email: ${item.cusEmail}`, 15, yOffset);
        yOffset += 10;
        doc.text(`Quantity: ${item.qty}`, 15, yOffset);
        yOffset += 20; // Increase vertical space between sections
    });

    doc.save('refund_report.pdf');
};

export default generateReport;

# OCR Document Tracking System

## Overview

The **OCR Document Tracking System** is a sophisticated document management platform designed to automate the processing and organization of incoming documents. Utilizing Optical Character Recognition (OCR) technology, this system extracts key details from document attachments and automatically populates them into designated fields. It then forwards these details to specific web pages such as Outgoing, OutADINVS, Mailed, and Background Information Applicant pages, streamlining the entire document management process.

## Key Features

- **Automated Document Processing**: 
  - Leverages OCR technology to extract crucial information such as tracking numbers, dates, document types, and subjects from incoming documents.
  - Automatically populates the extracted data into corresponding fields within the system.

- **Seamless Document Forwarding**:
  - Automatically forwards extracted document details to the relevant sections of the system, including Outgoing, OutADINVS, Mailed, and Background Information Applicant pages.
  - Reduces manual intervention and ensures accurate data handling across different departments.

- **Automated Printing**:
  - Each web page includes a convenient button for printing the details of selected documents.
  - Simplifies the process of generating physical copies of document information.

- **Statistical Operations**:
  - Provides automated yearly statistical computations for operational data.
  - Facilitates easy tracking, analysis, and reporting of document management activities.

## Benefits

- **Efficiency**: 
  - Streamlines the document processing workflow by reducing manual data entry and forwarding tasks.
  - Saves time and minimizes the risk of errors.

- **Automation**: 
  - Automatically handles document forwarding and printing, ensuring timely and accurate distribution of information.

- **Scalability**: 
  - Designed to manage a high volume of documents, making it suitable for organizations of all sizes.

- **Comprehensive Management**: 
  - Integrates multiple document types and operations, offering a holistic approach to document management and statistical analysis.

## Getting Started

To deploy and start using the OCR Document Tracking System, follow the installation and configuration steps outlined in the deployment guide.

---

This README provides an introduction to the system, its key features, and the benefits it offers, making it easier for users to understand and utilize the OCR Document Tracking System.



#To remove existing data use python manage.py delete_documents
#To Migrate your existing data, use django backend import by access http://127.0.0.1:8000/admin with user:admin and password:jrpogi404
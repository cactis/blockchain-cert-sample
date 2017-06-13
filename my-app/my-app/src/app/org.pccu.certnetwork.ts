// export namespace org.pccu.certnetwork{
   export enum CertStatus {
      EXPIRED,
      REVOKED,
      EFFECTIVE,
   }
   export class Issuer {
      issuerId: string;
      issuerName: string;
   }
   export class Receiver {
      receiverId: string;
      firstName: string;
      lastName: string;
   }
   export class CertTemplate {
      certTemplateId: string;
      issuer: Issuer;
      title: string;
   }
   export class Cert {
      certId: string;
      certTemplate: CertTemplate;
      receiver: Receiver;
      CertStatus: string;
      createdAt: string;
   }
   export class CertTransaction {
      transactionId: string;
      cert: Cert;
      receiver: Receiver;
      timestamp: Date;
   }
// }

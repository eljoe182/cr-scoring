import { json2csvAsync } from 'json-2-csv';
import { IExportRepository } from '../interface/IExportRepository';
import { GetInfoVicidialDataContract } from '@feat/crMaster/domain/contracts/GetInfoVicidialResponseContract';

export default class ExportRepository implements IExportRepository {
  async vicidialDataExportToCSV(data: GetInfoVicidialDataContract[]): Promise<unknown> {
    const renameHeaders = data.map((item) => ({
      LIST_ID: item.listId,
      LEAD_ID: item.leadId,
      DNI: item.vendorLeadCode,
      CUENTA: item.sourceId,
      TELEFONO: item.phoneNumber,
      OPERADORA: item.operator,
      SCORE: item.score,
      TIPO_CONTACTO: item.betterManagement,
      MEJOR_INTENTO: item.beastTry,
    }));

    return json2csvAsync(renameHeaders, {
      prependHeader: true,
      emptyFieldValue: '',
      delimiter: {
        wrap: '"', // Double Quote (") character
        field: ';', // Comma field delimiter
        eol: '\r', // Newline delimiter
      },
    });
  }
}

import { QuestionSet, Question } from 'nest-commander';

@QuestionSet({ name: NethysInquiryService.name })
export class NethysInquiryService {
  name = NethysInquiryService.name;

  @Question({
    message: 'Would you like scrape Archives of Nethys for data?',
    name: 'getConfirmation',
    type: 'confirm',
  })
  getConfirmation(confirmation: boolean): boolean {
    return confirmation;
  }
}

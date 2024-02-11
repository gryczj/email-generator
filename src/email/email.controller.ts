import { Body, Controller, Post} from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

    @Post('process')
    process(@Body() body: { emailContent: string, answerStyle: string }): any {
        console.log(body);
       return { message: 'Processing' };
    }
}

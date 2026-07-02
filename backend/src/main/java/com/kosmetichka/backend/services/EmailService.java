package com.kosmetichka.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender sender;

    public void sendPasswordResetEmail(String to, String resetLink) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Сброс пароля - КоSметичка");
        msg.setText("Для сброса пароля перейдите по ссылке - " + resetLink
                + "\n\nСсылка действительна в течение 15 минут. Если вы не запрашивали сброс пароля, просто игнорируйте это письмо.");
        sender.send(msg);
    }
}

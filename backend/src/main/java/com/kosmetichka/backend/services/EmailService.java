package com.kosmetichka.backend.services;

import com.kosmetichka.backend.models.api.CartPosition;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

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
    public void sendOrderReport(String to, String fullName, List<CartPosition> positions, BigDecimal total) {
        StringBuilder sb = new StringBuilder();

        sb.append("Здравствуйте, ").append(fullName).append("!\n\n");
        sb.append("Спасибо за заказ в магазине \"КоSметичка\". Ниже предоставлен полный чек:\n\n");
        for (CartPosition p : positions) {
            BigDecimal sum = p.getPrice().multiply(BigDecimal.valueOf(p.getQuantity()));
            sb.append("- ").append(p.getProduct().getName())
                    .append(" x ").append(p.getQuantity())
                    .append(" шт. = ").append(sum).append(" руб.\n");
        }
        sb.append("\nИтого: ").append(total).append(" руб.");

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Ваш заказ - Магазин \"КоSметичка\"");
        msg.setText(sb.toString());
        sender.send(msg);
    }
}

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        // Kullanıcıdan gelen e-posta ve ödeme sistemi adını alıyoruz
        const { email, method } = await request.json();
        
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Geçersiz e-posta' }, { status: 400 });
        }

        // E-postaların kaydedileceği dosyanın yolu (Projenin ana dizininde notify-list.json)
        const filePath = path.join(process.cwd(), 'notify-list.json');
        
        let data = [];
        
        // Eğer dosya zaten varsa içindeki eski kayıtları oku
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf8');
            data = JSON.parse(fileData);
        }

        // Yeni kayıt oluştur
        data.push({
            email,
            method,
            date: new Date().toLocaleString('tr-TR')
        });

        // Dosyaya yaz (Böylece Termux'ta projenin ana dizininde bu dosyayı görebileceksin)
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, message: 'Başarıyla kaydedildi' });
    } catch (error) {
        return NextResponse.json({ error: 'Sunucu hatası oluştu' }, { status: 500 });
    }
}


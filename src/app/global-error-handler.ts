import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // طباعة الخطأ في الـ Console كالمعتاد للمطورين
    console.error('Error caught by Angular:', error);

    // إنشاء شاشة طوارئ تظهر للبنات في المسجد عند حدوث الانهيار
    const errorMsg = error.message || error.toString();
    
    // نتحقق إن كان هناك شاشة خطأ معروضة سابقاً حتى لا نكررها
    if (!document.getElementById('angular-crash-screen')) {
      const errorDiv = document.createElement('div');
      errorDiv.id = 'angular-crash-screen';
      errorDiv.style.position = 'fixed';
      errorDiv.style.top = '0';
      errorDiv.style.left = '0';
      errorDiv.style.width = '100%';
      errorDiv.style.height = '100%';
      errorDiv.style.backgroundColor = '#ffffff';
      errorDiv.style.color = '#ff0000';
      errorDiv.style.padding = '20px';
      errorDiv.style.zIndex = '999999';
      errorDiv.style.fontFamily = 'monospace';
      errorDiv.style.overflowY = 'auto';
      errorDiv.style.boxSizing = 'border-box';
   // قمنا بترميز الخطأ أولاً لكي يُكتب داخل الإيميل بشكل سليم وبدون مشاكل في الروابط
const encodedError = encodeURIComponent(`السلام عليكم، واجهت الخطأ التالي في تطبيق هدى وتدبر:\n\n${errorMsg}`);
const developerEmail = 'your-email@example.com'; // 👈 ضعي إيميلكِ الحقيقي هنا تماماً

errorDiv.innerHTML = `
  <h3 style="color: #d9534f; margin-top: 0; font-family: sans-serif;">⚠️ حدث خطأ تقني في تحميل التطبيق:</h3>
  <p style="color: #333; background: #f7f7f7; padding: 10px; border-left: 4px solid #d9534f; white-space: pre-wrap; font-family: monospace;">
    <strong>تفاصيل الخطأ:</strong><br>${errorMsg}
  </p>
  
  <p style="color: #666; font-size: 14px; margin-top: 20px; font-family: sans-serif;">
    يرجى تصوير هذه الشاشة، أو الضغط على الزر أدناه لإرسال التقرير مباشرة إلى بريد المطورة لحل المشكلة فوراً:
  </p>
  
  <div style="margin-top: 15px;">
    <a href="mailto:${developerEmail}?subject=${encodeURIComponent('تقرير خطأ - تطبيق هدى وتدبر')}&body=${encodedError}" 
       style="display: inline-block; background-color: #d9534f; color: #ffffff; padding: 10px 20px; text-decoration: none; font-family: sans-serif; font-weight: bold; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      ✉️ إرسال الخطأ عبر الإيميل فوراً
    </a>
  </div>
`;
      
      document.body.appendChild(errorDiv);
    }
  }
}
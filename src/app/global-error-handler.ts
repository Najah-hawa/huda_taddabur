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
      
      errorDiv.innerHTML = `
        <h3 style="color: #d9534f; margin-top: 0;">⚠️ حدث خطأ تقني في تحميل التطبيق:</h3>
        <p style="color: #333; background: #f7f7f7; padding: 10px; border-left: 4px solid #d9534f; white-space: pre-wrap;">
          <strong>تفاصيل الخطأ:</strong><br>${errorMsg}
        </p>
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          يرجى تصوير هذه الشاشة كاملة وإرسالها للمطورة لحل المشكلة فوراً.
        </p>
      `;
      
      document.body.appendChild(errorDiv);
    }
  }
}
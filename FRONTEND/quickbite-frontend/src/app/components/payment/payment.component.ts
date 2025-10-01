
// /* src/app/components/payment/payment.component.ts */
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CartService } from '../../services/cart.service';
// import { OrderService } from '../../services/order.service';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { jsPDF } from 'jspdf';

// @Component({
//   selector: 'app-payment',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './payment.component.html'
// })
// export class PaymentComponent implements OnInit {
//   paymentMethod: 'COD'|'CARD' = 'COD';
//   summary: any = { subtotal: 0, delivery: 30, total: 0 };

//   constructor(
//     private cart: CartService,
//     private orderSvc: OrderService,
//     private auth: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     const s = localStorage.getItem('qb_cart_summary');
//     this.summary = s ? JSON.parse(s) : { subtotal: this.cart.getTotal(), delivery: 30, total: this.cart.getTotal() + 30 };
//   }

//   pay() {
//     const items = this.cart.getItems().map(i => ({
//       itemId: i.item.id!,
//       name: i.item.name,
//       price: i.item.price,
//       qty: i.quantity,
//       veg: i.item.veg
//     }));

//     // IMPORTANT FIX: get restaurantId from the first cart item's restaurantId
//     const firstCart = this.cart.getItems()[0];
//     const restaurantId = firstCart ? firstCart.item.restaurantId : 0;

//     const order = {
//       restaurantId,
//       items,
//       customerId: this.auth.currentUser?.id || 0,
//       totalAmount: this.summary.total,
//       deliveryCharge: this.summary.delivery,
//       paymentMethod: this.paymentMethod
//     };

//     this.orderSvc.placeOrder(order as any).subscribe({
//       next: (o: any) => {
//         this.generateInvoicePDF(o);
//         this.cart.clear();
//         // move to customer orders page
//         this.router.navigate(['/orders']);
//       },
//       error: err => {
//         console.error('place order error', err);
//         alert('Failed to place order');
//       }
//     });
//   }

//   generateInvoicePDF(order: any) {
//   const doc = new jsPDF();

//   // Header
//   doc.setFontSize(18);
//   doc.setFont("helvetica", "bold");
//   doc.text(order.restaurantName || "QuickBite", 105, 20, { align: "center" });

//   doc.setFontSize(11);
//   doc.text("INVOICE / BILL", 105, 28, { align: "center" });

//   // Order details
//   const date = new Date(order.createdAt || Date.now()).toLocaleString();
//   doc.setFontSize(12);
//   doc.setFont("helvetica", "normal");
//   doc.text(`Order ID: ${order.id}`, 14, 40);
//   doc.text(`Date: ${date}`, 150, 40);

//   // Table headers
//   let y = 60;
//   doc.setFont("helvetica", "bold");
//   doc.text("Item", 14, y);
//   doc.text("Qty", 100, y);
//   doc.text("Price", 140, y);
//   doc.text("Subtotal", 180, y);

//   // Table body
//   y += 8;
//   doc.setFont("helvetica", "normal");
//   let subtotal = 0;

//   order.items.forEach((it: any) => {
//     const itemTotal = it.price * it.qty;
//     subtotal += itemTotal;

//     doc.text(it.name, 14, y);
//     doc.text(String(it.qty), 105, y, { align: "right" });
//     doc.text(`₹${it.price.toFixed(2)}`, 150, y, { align: "right" });
//     doc.text(`₹${itemTotal.toFixed(2)}`, 195, y, { align: "right" });

//     y += 8;
//   });

//   // Totals
//   y += 6;
//   doc.text(`Delivery: ₹${order.deliveryCharge}`, 150, y, { align: "right" });

//   y += 8;
//   doc.setFont("helvetica", "bold");
//   doc.text(`TOTAL: ₹${order.totalAmount}`, 195, y, { align: "right" });

//   // Footer
//   y += 12;
//   doc.setFontSize(11);
//   doc.setFont("helvetica", "italic");
//   doc.text("Thank you for ordering with QuickBite!", 105, y, { align: "center" });

//   doc.save(`invoice-${order.id}.pdf`);
// }
// }
/* src/app/components/payment/payment.component.ts */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  paymentMethod: 'COD' | 'CARD' = 'COD';
  summary: any = { subtotal: 0, delivery: 30, total: 0 };
  // card form state
  showCardForm = false;
  cardForm!: FormGroup;
  processingPayment = false;
  cardError = '';

  constructor(
    private cart: CartService,
    private orderSvc: OrderService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const s = localStorage.getItem('qb_cart_summary');
    this.summary = s ? JSON.parse(s) : { subtotal: this.cart.getTotal(), delivery: 30, total: this.cart.getTotal() + 30 };

    // build card form
    this.cardForm = this.fb.group({
      cardholder: ['', [Validators.required, Validators.minLength(2)]],
      cardNumber: ['', [Validators.required, this.cardNumberValidator]],
      expiry: ['', [Validators.required, this.expiryValidator]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });
  }

  // called when user changes selection in UI
  onMethodChange() {
    this.showCardForm = (this.paymentMethod === 'CARD');
    this.cardError = '';
  }

  // Basic Luhn check for card numbers (acceptable for demo)
  cardNumberValidator(control: AbstractControl) {
    const v = (control.value || '').replace(/\s+/g, '');
    if (!v) return null;
    if (!/^\d{12,19}$/.test(v)) return { invalidNumber: true };
    // Luhn
    let sum = 0;
    let alt = false;
    for (let i = v.length - 1; i >= 0; i--) {
      let n = parseInt(v.charAt(i), 10);
      if (alt) { n *= 2; if (n > 9) n -= 9; }
      sum += n;
      alt = !alt;
    }
    return (sum % 10 === 0) ? null : { invalidLuhn: true };
  }

  expiryValidator(control: AbstractControl) {
    const v = (control.value || '').trim();
    // expect MM/YY or MM/YYYY
    const m = v.match(/^(\d{1,2})\/(\d{2}|\d{4})$/);
    if (!m) return { invalidExpiry: true };
    let month = parseInt(m[1], 10);
    let year = parseInt(m[2], 10);
    if (month < 1 || month > 12) return { invalidExpiry: true };
    if (m[2].length === 2) {
      // convert YY to 20YY (reasonable assumption)
      year += 2000;
    }
    const exp = new Date(year, month - 1, 1);
    // set to last day of month
    const lastOfMonth = new Date(year, month, 0);
    const now = new Date();
    // expire at end of month
    if (lastOfMonth < now) return { expired: true };
    return null;
  }

  // format card number with spaces for readability (optional)
  formatCardNumber(raw: string) {
    return (raw || '').replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  }

  pay() {
    this.cardError = '';
    if (this.paymentMethod === 'CARD') {
      // show/validate card form
      this.showCardForm = true;
      if (this.cardForm.invalid) {
        this.cardForm.markAllAsTouched();
        this.cardError = 'Please fix card details';
        return;
      }
      // simulate processing
      this.processingPayment = true;
      // demo: pretend to call gateway
      setTimeout(() => {
        this.processingPayment = false;
        // assume success
        this.placeOrder('CARD');
      }, 1200);
    } else {
      // COD — immediate
      this.placeOrder('COD');
    }
  }

  private placeOrder(method: 'COD' | 'CARD') {
    const items = this.cart.getItems().map(i => ({
      itemId: i.item.id!,
      name: i.item.name,
      price: i.item.price,
      qty: i.quantity,
      veg: i.item.veg
    }));

    const firstCart = this.cart.getItems()[0];
    const restaurantId = firstCart ? firstCart.item.restaurantId : 0;

    const order = {
      restaurantId,
      items,
      customerId: this.auth.currentUser?.id || 0,
      totalAmount: this.summary.total,
      deliveryCharge: this.summary.delivery,
      paymentMethod: method
    };

    this.orderSvc.placeOrder(order as any).subscribe({
      next: (o: any) => {
        try { this.generateInvoicePDF(o); } catch(e) { console.error('pdf gen err', e); }
        this.cart.clear();
        this.router.navigate(['/orders']);
      },
      error: err => {
        console.error('place order error', err);
        alert('Failed to place order');
      }
    });
  }

  generateInvoicePDF(order: any) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(order.restaurantName || "QuickBite", 105, 20, { align: "center" });

  doc.setFontSize(11);
  doc.text("INVOICE / BILL", 105, 28, { align: "center" });

  // Order details
  const date = new Date(order.createdAt || Date.now()).toLocaleString();
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Order ID: ${order.id}`, 14, 40);
  doc.text(`Date: ${date}`, 150, 40);

  // Table header
  let y = 60;
  doc.setFont("helvetica", "bold");
  doc.text("Item", 14, y);
  doc.text("Qty", 100, y);
  doc.text("Price", 140, y);
  doc.text("Subtotal", 170, y); // moved left a bit to avoid overflow

  y += 8;
  doc.setFont("helvetica", "normal");
  let subtotal = 0;

  (order.items || []).forEach((it: any) => {
    const itemTotal = Number((it.price || 0) * (it.qty || 0));
    subtotal += itemTotal;

    // wrap long names if needed
    const lines = doc.splitTextToSize(it.name || '', 80); // wrap width
    doc.text(lines, 14, y);
    // qty/price/subtotal on same baseline (use last line height)
    const lastLineCount = Array.isArray(lines) ? lines.length : 1;
    const baselineY = y + (lastLineCount - 1) * 7;

    doc.text(String(it.qty ?? 0), 100, baselineY, { align: "right" });
    doc.text(`Rs ${Number(it.price || 0).toFixed(2)}`, 140, baselineY, { align: "right" });
    doc.text(`Rs ${itemTotal.toFixed(2)}`, 195, baselineY, { align: "right" });

    y += lastLineCount * 7;
    y += 2;

    if (y > 260) {
      doc.addPage();
      y = 20;
    }
  });

  y += 6;
  doc.text(`Delivery: Rs ${Number(order.deliveryCharge || 0).toFixed(2)}`, 150, y, { align: "right" });

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL: Rs ${Number(order.totalAmount || 0).toFixed(2)}`, 195, y, { align: "right" });

  y += 12;
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for ordering with QuickBite!", 105, y, { align: "center" });

  doc.save(`invoice-${order.id}.pdf`);
}

}

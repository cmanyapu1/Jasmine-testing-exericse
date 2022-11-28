describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
      billAmtInput.value = 100;
      tipAmtInput.value = 20;
    });
  
    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
      submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(allPayments['payment' + paymentId].billAmt).toEqual('100');
      expect(allPayments['payment1'].tipAmt).toEqual('20');
      expect(allPayments['payment1'].tipPercent).toEqual(20);  
    });
  
    it('should not add a new payment to allPayments on submitPaymentInfo() with empty input', function () {
        billAmtInput.value = '';
        submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(0);
    });
  
    it('should payment update #paymenttable on appendPaymentTable()', function () {
      submitPaymentInfo();
      updatePaymentTable();
  
      let curTdList = document.querySelectorAll('#paymentTable tbody tr td');
  
      expect(curTdList.length).toEqual(4);
      expect(curTdList[0].innerText).toEqual('100');
      expect(curTdList[1].innerText).toEqual('20');
      expect(curTdList[2].innerText).toEqual('20%');
      expect(curTdList[3].innerText).toEqual('X');
    });

    it('should create a new payment on createCurPayment()', function () {
        let expectedPayment = {
          billAmt: '100',
          tipAmt: '20',
          tipPercent: 20,
        }
    
        expect(createCurPayment()).toEqual(expectedPayment);
      });
    
      it('should not create payment with empty input on createCurPayment()', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let curPayment = createCurPayment();
    
        expect(curPayment).toEqual(undefined);
      });    


    afterEach(function() {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
        });
  });
  
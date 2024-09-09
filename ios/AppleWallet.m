//
//  AppleWallet.m
//  alinma_bank_app
//
//  Created by jhajj on 09/08/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import "AppleWallet.h"

#import <React/RCTUtils.h>

#import <PassKit/PassKit.h>
#import <WatchConnectivity/WatchConnectivity.h>
#import "AppDelegate.h"

typedef void (^AddPaymentPassCompletionHandler)(PKAddPaymentPassRequest *request);

@interface AppleWallet () <PKAddPaymentPassViewControllerDelegate>

@property (nonatomic) UIViewController* addPaymentPassController;
@property (nonatomic) RCTPromiseResolveBlock resolver;
@property (nonatomic) RCTPromiseRejectBlock rejecter;
@property (nonatomic) AddPaymentPassCompletionHandler handler;

@end

@implementation AppleWallet

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

/**
 hacky fix to handle try again crash
 react native resolve promise only one time
 user may click try again so  emitting event in this case
 event name = addPassError
*/
PKAddPaymentPassViewController *lastController;
RCTPromiseResolveBlock lastResolve;
RCTPromiseRejectBlock lastReject;


RCT_REMAP_METHOD(canAddPaymentPass, canAddPaymentPassWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  BOOL result = [PKAddPaymentPassViewController canAddPaymentPass];
  resolve(@(result));
}

RCT_EXPORT_METHOD(eligibilityAddingToWallet:(NSArray *)arguments
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejector:(RCTPromiseRejectBlock)reject) {

  NSDictionary* options = [arguments objectAtIndex:0];
  NSString* suffix = [options objectForKey:@"primaryAccountNumberSuffix"];
  

  
  PKPassLibrary *passLibrary = [[PKPassLibrary alloc] init];
  NSArray<PKPass *>  *passes = [passLibrary passesOfType: PKPassTypePayment];

  NSMutableDictionary* dictionary = [[NSMutableDictionary alloc] init];
  [dictionary setObject:@"False" forKey:@"Wallet"];
  [dictionary setObject:@"False" forKey:@"Watch"];
  [dictionary setObject:@"" forKey:@"FPANID"];
  [dictionary setObject:@"" forKey:@"WatchConnected"];

  NSLog(@"passes count %lu ",(unsigned long)[passes count]);
  NSLog(@"suffix %@",suffix);

  if([passes count] != 0){
    for (PKPass* pass in passes) {
      if(pass.paymentPass.primaryAccountNumberSuffix == suffix){
        NSLog(@"pass.paymentPass.primaryAccountNumberSuffix %@",pass.paymentPass.primaryAccountNumberSuffix);
        NSLog(@"suffix %@",suffix);
        
        [dictionary setObject:@"True" forKey:@"Wallet"];
        [dictionary setObject:pass.paymentPass.primaryAccountNumberSuffix forKey:@"FPANID"];
      }
    }
  }
  NSArray<PKPass *> *remotepasses = [passLibrary remotePaymentPasses];
  if([remotepasses count] != 0 ){
    for (PKPass* pass in remotepasses) {
      NSLog(@"pass.paymentPass.primaryAccountNumberSuffix %@",pass.paymentPass.primaryAccountNumberSuffix);
      NSLog(@"suffix %@",suffix);

      if(pass.paymentPass.primaryAccountNumberSuffix == suffix){
        [dictionary setObject:@"True" forKey:@"Watch"];
        [dictionary setObject:pass.paymentPass.primaryAccountNumberSuffix forKey:@"FPANID"];
        break;
      }
    }
  }
  NSString * WatchConnected= [self isWatchConnected]?@"TRUE":@"FALSE";
  NSLog(@"WatchConnected %@",WatchConnected);
  [dictionary setObject:WatchConnected forKey:@"WatchConnected"];
  
  resolve(dictionary);
}

RCT_REMAP_METHOD(startAddPaymentPass, startAddPaymentPass:(NSDictionary*)options
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  NSLog(@"startadding %@", options);

  PKAddPaymentPassRequestConfiguration* configuration = [[PKAddPaymentPassRequestConfiguration alloc] initWithEncryptionScheme:PKEncryptionSchemeRSA_V2];


  if (options[@"cardholderName"]) {
    configuration.cardholderName = options[@"cardholderName"];
  } else {
    reject(@"arguments", @"cardholderName is required", nil);
    return;
  }
  if (options[@"primaryAccountSuffix"]) {
    configuration.primaryAccountSuffix = options[@"primaryAccountSuffix"];
  } else {
    reject(@"arguments", @"primaryAccountSuffix is required", nil);
    return;
  }
  if (options[@"localizedDescription"]) {
    configuration.localizedDescription = options[@"localizedDescription"];
  }
//  if (options[@"primaryAccountIdentifier"]) {
//    configuration.primaryAccountIdentifier = options[@"primaryAccountIdentifier"];
//  }
  NSString *primaryAccountIdentifier=[self getCardFPAN:options[@"primaryAccountSuffix"]];
  NSLog(@"primaryAccountIdentifier is %@",primaryAccountIdentifier);
  configuration.primaryAccountIdentifier =primaryAccountIdentifier ;


  NSString* paymentNetwork = options[@"paymentNetwork"];
  if (paymentNetwork) {
    paymentNetwork = [paymentNetwork uppercaseString];
    if ([paymentNetwork isEqualToString:@"VISA"]) {
      configuration.paymentNetwork = PKPaymentNetworkVisa;
    } else if ([paymentNetwork isEqualToString:@"MASTERCARD"]) {
      configuration.paymentNetwork = PKPaymentNetworkMasterCard;
    } else {
      reject(@"arguments", @"unsupported paymentNetwork", nil);
      return;
    }
  }

  if (self.addPaymentPassController) {
    reject(@"logic", @"Another request currently in process", nil);
    return;
  }

  self.addPaymentPassController = [[PKAddPaymentPassViewController alloc] initWithRequestConfiguration:configuration delegate:self];
  lastController= self.addPaymentPassController;
  
  if (!self.addPaymentPassController) {
    reject(@"system", @"can't configure PKAddPaymentPassViewController", nil);
    return;
  }

  self.resolver = resolve;
  self.rejecter = reject;
  lastResolve=resolve;
  lastReject=reject;
  UIViewController* vc = RCTPresentedViewController();
  [vc presentViewController:self.addPaymentPassController animated:YES completion:nil];
}

RCT_REMAP_METHOD(completeAddPaymentPass, completeAddPaymentPass:(NSDictionary*)options
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
  
  if (self.addPaymentPassController == nil || self.handler == nil) {
    reject(@"logic", @"startAddPaymentPass wasn't called or still in work", nil);
    return;
  }
 // NSString* activationData = options[@"activationData"];
 // NSString* encryptedPassData = options[@"encryptedPassData"];
 // NSString* wrappedKey = options[@"wrappedKey"];

  PKAddPaymentPassRequest* request = [[PKAddPaymentPassRequest alloc] init];

  //request.activationData = [[NSData alloc] initWithBase64EncodedString:activationData options:0];
  //request.encryptedPassData = [[NSData alloc] initWithBase64EncodedString:encryptedPassData options:0];
  //request.wrappedKey = [[NSData alloc] initWithBase64EncodedString:wrappedKey options:0];
  NSData * encryptedPassData = [[NSData alloc] initWithBase64EncodedString:options[@"encryptedPassData"] options:0];
  NSData * activationData = [[NSData alloc] initWithBase64EncodedString:options[@"activationData"] options:0];
  NSData * wrappedKey = [[NSData alloc] initWithBase64EncodedString:options[@"wrappedKey"] options:0];
  [request setWrappedKey:wrappedKey ];
  [request setActivationData:activationData ];
  [request setEncryptedPassData:encryptedPassData ];

  
  self.resolver = resolve;
  self.rejecter = reject;

  self.handler(request);
  self.handler = nil;
}


- (void)addPaymentPassViewController:(nonnull PKAddPaymentPassViewController *)controller
          didFinishAddingPaymentPass:(nullable PKPaymentPass *)pass
                               error:(nullable NSError *)error {
  NSLog(@"didFinishAddingPaymentPass1 %@", pass);
//  if(controller == NULL){
//    controller=lastController;
//  }
  if(controller != NULL){
    [controller dismissViewControllerAnimated:YES completion:nil];

  }

  NSLog(@"didFinishAddingPaymentPass2 %@", error);
  
//  NSAssert(self.addPaymentPassController != nil, @"addPaymentPassController is nil");
//  NSAssert(self.resolver != nil, @"resolver is nil");
//  NSAssert(self.rejecter != nil, @"rejecter is nil");
  if(self.addPaymentPassController==nil){
    self.addPaymentPassController=lastController;
  }
  if(self.resolver==nil){
    self.resolver=lastResolve;
  }
  if(self.rejecter==nil){
    self.rejecter=lastReject;
  }
  
  
  if (pass) {
    self.resolver(@(YES));
  } else {
    NSLog(@"%@", error);
    if(error == nil ){
      self.resolver(@(NO));
    }else{
//      [self sendEventWithName:@"addPassError" body:(@{@"error":@"failed to add"})];
    }
 
  }
  self.addPaymentPassController = nil;
  self.resolver = nil;
  self.rejecter = nil;
}


- (void)addPaymentPassViewController:(nonnull PKAddPaymentPassViewController *)controller
 generateRequestWithCertificateChain:(nonnull NSArray<NSData *> *)certificates
                               nonce:(nonnull NSData *)nonce
                      nonceSignature:(nonnull NSData *)nonceSignature
                   completionHandler:(nonnull void (^)(PKAddPaymentPassRequest * _Nonnull))handler {
  
  @try {
    if (self.addPaymentPassController != controller) {
      return;
    }
    NSAssert(self.addPaymentPassController != nil, @"addPaymentPassController is nil");
    NSAssert(self.resolver != nil, @"resolver is nil");
    NSAssert(self.rejecter != nil, @"rejecter is nil");

    self.handler = handler;

    //NSString *certificateOfIndexZeroString = [certificates[0] base64EncodedStringWithOptions:0];
    //NSString *certificateOfIndexOneString = [certificates[1] base64EncodedStringWithOptions:0];
   // NSString *nonceString = [nonce base64EncodedStringWithOptions:0];
   // NSString *nonceSignatureString = [nonceSignature base64EncodedStringWithOptions:0];

    NSMutableArray *certificatesArray = [[NSMutableArray alloc] init];
    NSMutableArray *cryptographyInfo = [[NSMutableArray alloc] init];
    NSString* nonceString = [self dataToHexString:nonce];
    NSString* nonceSignatureString = [self dataToHexString:nonceSignature];
    [cryptographyInfo addObject:nonceString];
    [cryptographyInfo addObject:nonceSignatureString];
    for (NSData* certificate in certificates)
       {
           [certificatesArray addObject:[certificate base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithCarriageReturn]];
       }
    
    [cryptographyInfo addObject:certificatesArray];
 
    self.resolver(cryptographyInfo);

  
   }
   @catch (NSException *exception) {
      NSLog(@"%@", exception.reason);
     self.rejecter(@"system", [exception reason],nil);

   }
   @finally {
   }
  
  self.resolver = nil;
  self.rejecter = nil;
}

- (NSArray<NSString *> *)supportedEvents{
  return @[@"addPassError"];
}
- (NSString *)dataToHexString:(NSData *)data {
    const unsigned char *bytes = (const unsigned char *)data.bytes;
    NSMutableString *hex = [NSMutableString new];
    for (NSInteger i = 0; i < data.length; i++) {
        [hex appendFormat:@"%02x", bytes[i]];
    }
    return [hex copy];
}


- (NSString *) getCardFPAN:(NSString *) cardSuffix{
    
  @try {
    PKPassLibrary *passLibrary = [[PKPassLibrary alloc] init];
    NSArray<PKPass *> *paymentPasses = [passLibrary passesOfType:PKPassTypePayment];
    for (PKPass *pass in paymentPasses) {
        PKPaymentPass * paymentPass = [pass paymentPass];
        if([paymentPass primaryAccountNumberSuffix] == cardSuffix)
            return [paymentPass primaryAccountIdentifier];
    }
    
    if (WCSession.isSupported) { // check if the device support to handle an Apple Watch
        WCSession *session = [WCSession defaultSession];
        [session setDelegate:self];
        [session activateSession];
        
        if ([session isPaired]) { // Check if the iPhone is paired with the Apple Watch
            paymentPasses = [passLibrary remotePaymentPasses];
            for (PKPass *pass in paymentPasses) {
                PKPaymentPass * paymentPass = [pass paymentPass];
                if([paymentPass primaryAccountNumberSuffix] == cardSuffix)
                    return [paymentPass primaryAccountIdentifier];
            }
        }
    }

  } @catch (NSException *exception) {
    
  } @finally {
    
  }
    return nil;
}

-(BOOL)isWatchConnected{
  BOOL isConnected=false;
  @try {
    if (WCSession.isSupported) { // check if the device support to handle an Apple Watch
        WCSession *session = [WCSession defaultSession];
        [session setDelegate:self];
      [session activateSession];
        if(session.paired){
            // Paired
          isConnected=true;

        }
    }
  } @catch (NSException *exception) {
    isConnected=false;
  } @finally {
    return  isConnected;
  }
}

@end


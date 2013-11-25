//
//  AppDelegate.m
//  BluetoothLowEnergyTest
//
//  Created by Fabian on 20.11.13.
//  Copyright (c) 2013 ZHAW. All rights reserved.
//

#import "AppDelegate.h"

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    // create manager
    CBPeripheralManager *manager = [[CBPeripheralManager alloc] initWithDelegate:self queue:nil options:nil];
    
    // initialize UUIDs
    CBUUID *characteristicUUID = [CBUUID UUIDWithString: @"2A38"];
    CBUUID *serviceUUID = [CBUUID UUIDWithString: @"180D"];
    
    // create value object
    int heartRate = 42;
    NSData *value = [NSData dataWithBytes: &heartRate length: sizeof(heartRate)];
    
    // create service with characteristic
    CBMutableCharacteristic *characteristic = [[CBMutableCharacteristic alloc] initWithType:characteristicUUID properties:CBCharacteristicPropertyRead value:value permissions:CBAttributePermissionsReadable];
    CBMutableService *service = [[CBMutableService alloc] initWithType:serviceUUID primary:YES];
    service.characteristics = @[characteristic];

    // add service and advertise
    [manager addService:service];
    [manager startAdvertising:@{ CBAdvertisementDataServiceUUIDsKey : @[serviceUUID] }];
    
    //NSLog("%@", manager.);
}

- (void)peripheralManagerDidUpdateState:(CBPeripheralManager *)peripheral {
 
}

@end

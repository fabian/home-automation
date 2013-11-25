//
//  AppDelegate.h
//  BluetoothLowEnergyTest
//
//  Created by Fabian on 20.11.13.
//  Copyright (c) 2013 ZHAW. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import <IOBluetooth/IOBluetooth.h>

@interface AppDelegate : NSObject <NSApplicationDelegate, CBPeripheralManagerDelegate>

@property (assign) IBOutlet NSWindow *window;

@end

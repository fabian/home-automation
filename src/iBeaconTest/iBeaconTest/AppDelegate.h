//
//  AppDelegate.h
//  iBeaconTest
//
//  Created by Fabian on 25.11.13.
//  Copyright (c) 2013 ZHAW. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>
#import <CoreBluetooth/CoreBluetooth.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, CBPeripheralManagerDelegate>

@property (strong, nonatomic) UIWindow *window;

@property (strong, nonatomic) CBPeripheralManager *peripheralManager;

@end

# Space-Station-Puzzle

EBI Solutions Programming Exercise

*This branch contains an exploration of the idea for my own curiosity*
_Disclaimer: all additional code in this branch is not submitted as part of the Programming Excersise but is instead included to show where a development of the ideas presented in the original excersise may have led_

## Instructions

### First we need to start up the 'Employee Data Api'

From a terminal in the root folder of the project:

```
cd ./employee-data-api
npm install
npm run start
```

### Second we start the main vue app

From a new terminal in the root folder of the project:

```
cd ./space-station-comms
npm install
cp .env.dev .env
npm run serve
```

You can then navigate to the vue app from your browser:

http://localhost:8080/

Enjoy :)


## First section

### A written summary of the problem to be solved

The International Space Station has split in two. The cause is unknown however we know that the section that all 5 astronaughts are stranded on is rapidly loosing oxygen!

Mission Control has confirmed that another section of the ISS is still intact and a plan needs to be formed to move the crew from the damaged module. We only have 21 minutes before the oxygen runs out. We can only move a maximum of 2 astronaughts at a time as only 2 spacesuits have survived intact and the two sections of the Space Station are seperated by the void of space.

### The details. 

In order to effectively plan the evacuation of the whole crew we have analysed the data from their physical assesments to estimate how long it will take each of them to cover the distance from one section to the other.

The fastest crew members are Neil and Michael and so we expect any plan will likely involve them assisting the rest of the crew to safety and returning the 2 spacesuits to the damaged module until everyone has made it across...

#### Crew Transfer Times

    Neil         - 1 minute
    Michael     - 2 minutes
    Valentina    - 3 minutes
    Yuri        - 5 minutes
    Edwin        - 10 minutes
    
#### Incedent Details

    Distance to cover - 500m
    Maximum time      - 21 minutes
    
#### What I propose

We have 5 crew members
Each trip we send 2 of the crew to the intact module, leave 1 there and have the other 1 bring us back both suits

```
1 trip === { 
  crew: [carrier, evacuee?optional], 
  transferRate: 1, 
  transferTime: max(...crew.map(c => c.transferTime)),
}
```

```
*final trip the transfer rate === 2 as no return is required*
```

```
total outgoing trips required === crew.length - 1
```

```
total return trips required === (total outgoing trips required) - 1
```

```
outgoingTrips.length === 5 - 1 === 4
returnTrips.length === 4 - 1 === 3
```

```
totalTransfers === 7
```

```
Worst case === 7 transfers with the slowest member of the crew (Edwin) present on every transfer === 7 * 10mins === 70mins
```
The worst case is far too slow which means that we have to think about the order here

*Assumptions:*

Travel times includes putting on and removal of the space suit in addition to negotiating the air lock.

##### A reasonable initial approach - Focus on the return trips

We can use the fastest crew member (Neil) on all 7 transfers and get him to take 1 additional crew member on each outgoing trip

```
3 x returnTrips ==== [ 1min, 1min, 1min ]; 

sum(...returnTrips) === 3 mins
```

```
4 x outgoingTrips === {
    { evacuee: Michael,   transferTime: 2 min },
    { evacuee: Valentina, transferTime: 3 min },
    { evacuee: Yuri,      transferTime: 5 min },
    { evacuee: Edwin,     transferTime: 10 min }
}

sum(...outGoingTrips.map(t => t.transferTime)) === 20 mins
```

```
totalTransferTime === 23 mins; 
```

```
expect(totalTransferTime).toBeLessThanOrEqual(21 mins)  // expected 23 <= 21
```
We still aren't there

##### A more efficient approach - Make use of the max(...transferTimes) in outward trips

Where we have more than 1 crew member on a transfer then the transferTime for the trip === max(...transferTimes)

That means that when we transfer the slowest crew member (Edwin - 10 mins) the transfer time will be uneffected by which of the other crew members we send over at the same time (as long as we have someone quick to bring the suit back)

We should take advantage of any of these cases and send the next slowest available crew member over 

If we ensure that we take people over in ascending order of transferTime (except for the above cases) then we should increase our chances of matching the above criteria.

We should always choose the fastest person available on the safe Space Station module to take the spacesuit back.

The above approach will show a preference to the fastest crew member being the primary carrier and the second fastest crew member being the carrier that brings back the spacesuit after a slow pair transfer over.

*We can then apply the above to generate the following rules:*

```
*returnTrips* { carrier: min(...safeSection.crew.map(c => c.transferTime)) }
```

```
*outwardTrips* :

if (we have the second fastest crew memeber already on the safe module) {
  send the 2 slowest crew members // the second fastest crew member will bring back the spacesuit on the return trip
} else {
  send the fastest crew member back with the next fastest available crew member
}
```

```
Damaged Module         crewTransfers     transferTime

[ 1, 2, 3, 5, 10 ]  -> [ 1, 2 ]           2 min
[ 3, 5, 10 ]        <- [ 1 ]              1 min
[ 1, 3, 5, 10 ]     -> [ 10, 5 ]          10 min
[ 1, 3 ]            <- [ 2 ]              2 min
[ 1, 2, 3 ]         -> [ 1, 2 ]           2 min
[ 3 ]               <- [ 1 ]              1 min
[ 1, 3 ]            -> [ 3, 1 ]           3 min

totalTransfers === 7
totalTransferTime === 21 min
```

```
expect(totalTransferTime).toBeLessThanOrEqual(21 mins)  // expected 23 <= 21
```

We've got a plan!


## Second Section

### The program to solve the logic problem.

I wrote some javascript to test the above approach.

This has been included for reference as logic.js


## What next...

I would love to introduce the solution logic from logic.js in the form of an additional message window that can be opened up within the vue app. 

This could mimic a social messaging chat window giving the user an 'ask a friend' option.

The messaging within this chat window could be powered by an IBM watson assistant service. The conversation tree being designed to handle questions from the user and to provide instruction for solving the problem based on the logic draughted out in logic.js.

The user could then use the additional chat window to guide them through solving the problem.

export class Car {

    static NORTH = new THREE.Vector3(0,0,-1)
    static VERTICAL = new THREE.Vector3(0,1,0)

    constructor(
        scene,
        position = new THREE.Vector3(0,0,0), 
        direction = Car.NORTH
    ) {
        this.width = 10
        this.length = 15
        this.wheelRadius = 3

        this.maxSpeed = 3
        this.maxReverseSpeed = -1
        this.maxSteeringAngle = 30 // deg
        this.speed = 0
        this.steeringAngle = 0
        this.position = position
        this.direction = direction
        this.heading = 0

        this.acceleration = 0.08
        this.brakeDeceleration = 0.2
        this.naturalDeceleration = 0.05

        this.steeringSpeed = 0.8
        this.steeringReturnSpeed = 1

        this.scene = scene
         
        this.position.y = this.wheelRadius
        var geometry = new THREE.BoxGeometry( this.width, 2, this.length );
        var material = new THREE.MeshLambertMaterial( { color: 0xFDFEFE } );
        this.carMesh = new THREE.Mesh( geometry, material )     
        this.carMesh.castShadow = true
        this.carMesh.receiveShadow = true
        scene.add(this.carMesh)
        this.carMesh.position.copy(position)

        geometry = new THREE.CylinderGeometry( this.wheelRadius , this.wheelRadius , 1, 32 );
        material = new THREE.MeshLambertMaterial( {color: 0x1C2833} );
        this.flWheelMesh = new THREE.Mesh( geometry, material );
        this.flWheelMesh.position.copy(position)
        this.flWheelMesh.rotation.z = Math.PI/2
        this.frWheelMesh = this.flWheelMesh.clone()
        this.rlWheelMesh = this.flWheelMesh.clone()
        this.rrWheelMesh = this.flWheelMesh.clone()
        this.flWheelMesh.position.add(new THREE.Vector3(-5, 0, -this.length/2))
        this.frWheelMesh.position.add(new THREE.Vector3(5, 0, -this.length/2))
        this.rlWheelMesh.position.add(new THREE.Vector3(-5, 0, this.length/2))
        this.rrWheelMesh.position.add(new THREE.Vector3(5, 0, this.length/2))

        this.flWheelMesh.castShadow = true
        this.flWheelMesh.receiveShadow = true
        this.frWheelMesh.castShadow = true
        this.frWheelMesh.receiveShadow = true
        this.rlWheelMesh.castShadow = true
        this.rlWheelMesh.receiveShadow = true
        this.rrWheelMesh.castShadow = true
        this.rrWheelMesh.receiveShadow = true
        
        scene.add( this.flWheelMesh )
        scene.add( this.frWheelMesh )
        scene.add( this.rlWheelMesh )
        scene.add( this.rrWheelMesh )
        
    }

    setPosition( v ) {
        this.position = v
    }

    updateMeshPosition() {
        let pos = new THREE.Vector3(0,0,0)

        var qHeading = new THREE.Quaternion(); // create one and reuse it
        qHeading.setFromUnitVectors( new THREE.Vector3(0,0,-1), this.direction );

        // update wheel position
        let wheelOffset;
        wheelOffset = new THREE.Vector3(-5, 0, -this.length/2)
        wheelOffset.applyQuaternion(qHeading)
        pos.copy(this.position)
        this.flWheelMesh.position.copy( pos.add(wheelOffset) )

        wheelOffset = new THREE.Vector3(5, 0, -this.length/2)
        wheelOffset.applyQuaternion(qHeading)
        pos.copy(this.position)
        this.frWheelMesh.position.copy( pos.add(wheelOffset) )

        wheelOffset = new THREE.Vector3(-5, 0, this.length/2)
        wheelOffset.applyQuaternion(qHeading)
        pos.copy(this.position)
        this.rlWheelMesh.position.copy( pos.add(wheelOffset) )

        wheelOffset = new THREE.Vector3(5, 0, this.length/2)
        wheelOffset.applyQuaternion(qHeading)
        pos.copy(this.position)
        this.rrWheelMesh.position.copy( pos.add(wheelOffset) )

        var qWheel = new THREE.Quaternion()
        qWheel.copy(qHeading)
        var qWheelModel = new THREE.Quaternion()
        qWheelModel.setFromAxisAngle (new THREE.Vector3(0,0,1), Math.PI/2)
        qWheel.multiply(qWheelModel)

        var qSteering = new THREE.Quaternion()
        qSteering.copy(qHeading)
        var qSteerAngle = new THREE.Quaternion()
        qSteerAngle.setFromAxisAngle (Car.VERTICAL, degreeToRad(this.steeringAngle))
        qSteering.multiply(qSteerAngle)
        qSteering.multiply(qWheelModel)

        this.flWheelMesh.setRotationFromQuaternion(qSteering)
        this.frWheelMesh.setRotationFromQuaternion(qSteering)
        this.rlWheelMesh.setRotationFromQuaternion(qWheel)
        this.rrWheelMesh.setRotationFromQuaternion(qWheel)

        // update car position
        this.carMesh.position.copy(this.position)
        this.carMesh.setRotationFromQuaternion( qHeading )


    }

    
    updateControl (pedal, steer){

        if (pedal === 1) {
            if (this.speed < this.maxSpeed) {
                this.speed += this.acceleration
            }            
        } else if (pedal === -1) {
            if (this.speed > 0) {
                if (this.speed > this.brakeDeceleration) {
                    this.speed -= this.brakeDeceleration
                } else {
                    this.speed = 0
                }
            } else if (this.speed <= 0) {
                if ( this.speed > this.maxReverseSpeed) {
                    this.speed -= this.acceleration
                } 
            }
            
        } else {
            if (this.speed > 0.5) {
                this.speed -= this.naturalDeceleration
            } else if (this.speed < -0.5) {
                this.speed += this.naturalDeceleration
            } else {
                this.speed = 0
            }
        }

        if (steer === 1) { // steer right
            if (this.steeringAngle > -this.maxSteeringAngle) {
                this.steeringAngle -= this.steeringSpeed
            }
        } else if (steer === -1) {
            if (this.steeringAngle < this.maxSteeringAngle) {
                this.steeringAngle += this.steeringSpeed
            }
        } else {
            if (this.steeringAngle > 0) {
                this.steeringAngle -= this.steeringReturnSpeed
            } else if (this.steeringAngle < 0) {
                this.steeringAngle += this.steeringReturnSpeed
            }
        }

        // console.log('speed = ', this.speed, ', steering = ', this.steeringAngle)

        let verticalAxis = new THREE.Vector3 (0, 1, 0)

        if (this.speed !== 0) {

            let carDirection = new THREE.Vector3(0,0,0)
            carDirection.copy(this.direction)
            carDirection.multiplyScalar( this.speed - this.length / 2 )
            let rearDisplacement = new THREE.Vector3(0,0,0);
            rearDisplacement.copy(this.position)
            rearDisplacement.add(carDirection)

            let newFrontWheelDirection = new THREE.Vector3(0,0,0)
            newFrontWheelDirection.copy(this.direction)
            newFrontWheelDirection.applyAxisAngle( verticalAxis, degreeToRad(this.steeringAngle/4))
            newFrontWheelDirection.multiplyScalar( this.speed + this.length / 2)
            let frontDisplacement = new THREE.Vector3(0,0,0);
            frontDisplacement.copy(this.position)
            frontDisplacement.add(newFrontWheelDirection)

            frontDisplacement.sub(rearDisplacement)
            frontDisplacement.normalize()
            this.direction.copy(frontDisplacement)

            let displacement = new THREE.Vector3(0,0,0);
            displacement.copy(this.direction)    
            this.position.add(displacement.multiplyScalar(this.speed))
        }

        this.updateMeshPosition()

    }


}


function degreeToRad(deg) {
    return deg * Math.PI / 180
}

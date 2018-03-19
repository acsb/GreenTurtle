/* -----------------------CODECUP 2018 ---------
 *  Membros : Guilherme
 *            Douglas
 *            Viviane
 *            Carol
 *            Arthur
 *  DATA : 18/03/2018
 *  
*/
#include <WISOL.h>
#include <Tsensors.h>
#include <Wire.h>
#include <math.h>
#include <SimpleTimer.h>
#include <avr/wdt.h>
#include <VirtualWire.h>
#include <SoftwareServo.h>

SoftwareServo servo;
Tsensors *tSensors = new Tsensors();

const int servo_pin = 9,
          rx_pin = 7,
          led_azul = 6;
bool  travado = false,
      rastreamento = false;
float ax,ay,az,res,res_anterior;
long t, T, t1, t2, t_ultimo_rast,
      T_rastreamento = 600000,
      periodo_correndo = 450,
      periodo_caminhando = 650;

void destrava(){
  int i;
  for(i=30;i<100;i++){
    servo.write(i);
    SoftwareServo::refresh();
    delay(1);
  }
}
void trava(){
  int i;
  for(i=100;i>30;i--){
    servo.write(i);
    SoftwareServo::refresh();
    delay(1);
  }
}
void setup() {
  pinMode(13,OUTPUT);
  pinMode(led_azul,OUTPUT);
  digitalWrite(13, LOW);
  servo.attach(servo_pin);
  Serial.begin(9600);
  servo.write(0);
  SoftwareServo::refresh();
  // Inicializando sensores
  Wire.begin();
  Wire.setClock(100000);
  // Init sensors on Thinxtra Module
  tSensors->initSensors();
}

void loop() {
  t = millis();
  // Initialise the IO and ISR
  vw_set_rx_pin(rx_pin);
  vw_set_ptt_inverted(true); // Required for DR3100
  vw_setup(2000);   // Bits per sec
  vw_rx_start();       // Start the receiver PLL running
  // COMUNICACAO COM O TRANSMISSOR (PULSEIRA)
  uint8_t buf[VW_MAX_MESSAGE_LEN];
  uint8_t buflen = VW_MAX_MESSAGE_LEN;
  if (vw_get_message(buf, &buflen)) 
  {
      if(!travado){
        trava();
        travado = true;
        rastreamento = false;
      }else{
        destrava();
        travado = false;
      }
  }
  // VIGILANCIA DE MOVIMENTAÇÕES ESTRANHAS
  if(travado){    
    ax = tSensors->getAccX();
    ay = tSensors->getAccY();
    az = tSensors->getAccZ();
    res = sqrt(ax*ax + ay*ay + az*az);
    if(res_anterior<1 && res>1){
      t1 = t;
    }else if(res_anterior>1 && res<1){
      t2 = t;
    }
    if((t-t1)> 1000 || (t-t2)>1000){
      T = 2000;
    }else{
      T = 2*abs(t2-t1);
    }
    if((T>=100) && (T<=periodo_caminhando)){
      Serial.print("AT$SF=1");  // mensagem de tentativa de roubo
      digitalWrite(led_azul,HIGH);
      delay(1000);
      digitalWrite(led_azul,LOW);
      rastreamento = true;      // ENTRADA NO MODO RASTREAMENTO
    }
  }
  if(t- t_ultimo_rast>T_rastreamento){  // rotina de rastreamento quando em roubo
    Serial.print("AT$SF=2");    // mensagem de roubo em andamento, COM RASTREIO
    digitalWrite(led_azul,HIGH);
    delay(1000);
    digitalWrite(led_azul,LOW);
    t_ultimo_rast = t;
  }
}

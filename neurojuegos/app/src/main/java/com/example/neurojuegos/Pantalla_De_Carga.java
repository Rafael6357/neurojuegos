package com.example.neurojuegos;


import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ProgressBar;

import java.util.Timer;
import java.util.TimerTask;

public class Pantalla_De_Carga extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pantalla_de_carga);

        TimerTask tarea=new TimerTask() {
            @Override
            public void run() {
                Intent intent=new Intent(Pantalla_De_Carga.this,Inicio_Activity.class);
                startActivity(intent);
                finish();
            }
        };
        Timer tiempo=new Timer();
        tiempo.schedule(tarea,3000);


    }
}




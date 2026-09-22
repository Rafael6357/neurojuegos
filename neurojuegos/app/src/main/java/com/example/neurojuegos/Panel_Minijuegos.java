package com.example.neurojuegos;


import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.AnimationUtils;
import android.view.animation.TranslateAnimation;
import android.widget.Button;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.os.Bundle;
import android.view.View;
import android.view.animation.AccelerateDecelerateInterpolator;
import android.view.animation.Animation;
import android.view.animation.AnimationSet;
import android.view.animation.AnimationUtils;
import android.view.animation.TranslateAnimation;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;

public class Panel_Minijuegos extends AppCompatActivity {
    private ImageView imagenLapiz;
    private ImageView buttonInicio;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_panel_minijuegos);

        buttonInicio = findViewById(R.id.regresar_inicio);

        buttonInicio.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(Panel_Minijuegos.this, Inicio_Activity.class);
                startActivity(intent);
            }
        });

        ImageView imagenLapiz = findViewById(R.id.imagen_lapiz_panel_minijuegos);
        imagenLapiz.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Animación de rotación
                ObjectAnimator rotation = ObjectAnimator.ofFloat(imagenLapiz, "rotation", 0f, 5f, -5f, 5f, -5f, 0f);
                rotation.setDuration(600);
                rotation.setInterpolator(new AccelerateDecelerateInterpolator());

                // Animación de traslación en X
                ObjectAnimator translationX = ObjectAnimator.ofFloat(imagenLapiz, "translationX", 0f, -30f, 30f, -30f, 30f, 0f);
                translationX.setDuration(600);
                translationX.setInterpolator(new AccelerateDecelerateInterpolator());

                // Animación de traslación en Y
                ObjectAnimator translationY = ObjectAnimator.ofFloat(imagenLapiz, "translationY", 0f, -30f, 30f, -30f, 30f, 0f);
                translationY.setDuration(600);
                translationY.setInterpolator(new AccelerateDecelerateInterpolator());

                // Combinar las animaciones en un conjunto
                AnimatorSet animatorSet = new AnimatorSet();
                animatorSet.play(rotation).with(translationX).with(translationY);
                animatorSet.start();
            }

        });

        Button btn_frases_vof = findViewById(R.id.btn_frases_vof);
        btn_frases_vof.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Define la actividad de destino
                Intent intent = new Intent(Panel_Minijuegos.this, niveles_frasesvof.class);

                // Inicia la actividad de destino
                startActivity(intent);
            }
        });

        Button btn_recuerda = findViewById(R.id.btn_recuerda);
        btn_recuerda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Define la actividad de destino
                Intent intent = new Intent(Panel_Minijuegos.this, niveles_recuerda.class);

                // Inicia la actividad de destino
                startActivity(intent);
            }
        });

        Button btn_identifica = findViewById(R.id.btn_identifica);
        btn_identifica.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Define la actividad de destino
                Intent intent = new Intent(Panel_Minijuegos.this, niveles_identifica.class);

                // Inicia la actividad de destino
                startActivity(intent);
            }
        });

        Button btn_patrones = findViewById(R.id.btn_juego_de_patrones);
        btn_patrones.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Define la actividad de destino
                Intent intent = new Intent(Panel_Minijuegos.this, niveles_patrones.class);

                // Inicia la actividad de destino
                startActivity(intent);
            }
        });

        Button btn_adivina_la_palabra = findViewById(R.id.btn_adivina_la_palabra);
        btn_adivina_la_palabra.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Define la actividad de destino
                Intent intent = new Intent(Panel_Minijuegos.this, niveles_adivina_la_palabra.class);

                // Inicia la actividad de destino
                startActivity(intent);
            }
        });




    }




}
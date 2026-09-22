package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class VictoriaRecuerda extends AppCompatActivity {

    private int nivelActual;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_victoria_recuerda);

        // Obtener el valor de nivelActual del Intent
        Intent intent = getIntent();
        nivelActual = intent.getIntExtra("nivel_maxMemo", 1); // 1 es el valor predeterminado si no se encuentra el dato

        Button btnNextLevelRecuerda = findViewById(R.id.btnNextLevelRecuerda);
        btnNextLevelRecuerda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda2.class);
                        break;
                    case 2:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda3.class);
                        break;
                    case 3:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda4.class);
                        break;
                    case 4:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda5.class);
                        break;
                    case 5:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda6.class);
                        break;
                    case 6:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda7.class);
                        break;
                    case 7:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda8.class);
                        break;
                    case 8:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda9.class);

                        break;
                    case 9:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda10.class);
                        break;
                    case 10:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda11.class);
                        break;
                    case 11:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda12.class);
                        break;
                    case 12:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda13.class);
                        break;

                    case 13:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda14.class);
                        break;
                    case 14:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda15.class);
                        break;

                    case 15:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda16.class);
                        break;

                    case 16:
                        intent = new Intent(VictoriaRecuerda.this, niveles_recuerda.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });

        Button repetir_nivel_recuerda = findViewById(R.id.repetir_nivel_recuerda);
        repetir_nivel_recuerda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda1.class);
                        break;
                    case 2:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda2.class);
                        break;
                    case 3:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda3.class);
                        break;
                    case 4:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda4.class);
                        break;
                    case 5:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda5.class);
                        break;
                    case 6:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda6.class);
                        break;
                    case 7:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda7.class);
                        break;
                    case 8:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda8.class);

                        break;
                    case 9:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda9.class);
                        break;
                    case 10:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda10.class);
                        break;
                    case 11:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda11.class);
                        break;
                    case 12:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda12.class);
                        break;
                    case 13:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda13.class);
                        break;
                    case 14:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda14.class);
                        break;
                    case 15:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda15.class);
                        break;
                    case 16:
                        intent = new Intent(VictoriaRecuerda.this, Recuerda16.class);
                        break;
                    case 17:
                        intent = new Intent(VictoriaRecuerda.this, niveles_recuerda.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });
    }



    public void Todos_Los_Niveles(View view){
        Intent intent=new Intent(VictoriaRecuerda.this,niveles_recuerda.class);
        startActivity(intent);
    }



}
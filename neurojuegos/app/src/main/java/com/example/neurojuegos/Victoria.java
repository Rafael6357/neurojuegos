package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class Victoria extends AppCompatActivity {

    private int nivelActual;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_victoria);

        // Obtener el valor de nivelActual del Intent
        Intent intent = getIntent();
        nivelActual = intent.getIntExtra("nivelActual", 1); // 1 es el valor predeterminado si no se encuentra el dato

        Button btnNextLevel = findViewById(R.id.btn_sgte_level);
        btnNextLevel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(Victoria.this, FrasesVoF_2nivel.class);
                        break;
                    case 2:
                        intent = new Intent(Victoria.this, FrasesVoF_3nivel.class);
                        break;
                    case 3:
                        intent = new Intent(Victoria.this, FrasesVoF_4nivel.class);
                        break;
                    case 4:
                        intent = new Intent(Victoria.this, FrasesVoF_5nivel.class);
                        break;
                    case 5:
                        intent = new Intent(Victoria.this, FrasesVoF_6nivel.class);
                        break;
                    case 6:
                        intent = new Intent(Victoria.this, FrasesVoF_7nivel.class);
                        break;
                    case 7:
                        intent = new Intent(Victoria.this, FrasesVoF_8nivel.class);
                        break;
                    case 8:
                        intent = new Intent(Victoria.this, FrasesVoF_9nivel.class);

                        break;
                    case 9:
                        intent = new Intent(Victoria.this, FrasesVoF_10nivel.class);
                        break;
                    case 10:
                        intent = new Intent(Victoria.this, FrasesVoF_11nivel.class);
                        break;
                    case 11:
                        intent = new Intent(Victoria.this, FrasesVoF_12nivel.class);
                        break;
                    case 12:
                        intent = new Intent(Victoria.this, FrasesVoF_13nivel.class);
                        break;

                    case 13:
                        intent = new Intent(Victoria.this, FrasesVoF_14nivel.class);
                        break;
                    case 14:
                        intent = new Intent(Victoria.this, FrasesVoF_15nivel.class);
                        break;

                    case 15:
                        intent = new Intent(Victoria.this, FrasesVoF_16nivel.class);
                        break;

                    case 16:
                        intent = new Intent(Victoria.this, niveles_frasesvof.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });

        Button repetir_nivel = findViewById(R.id.repetir_nivel);
        repetir_nivel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(Victoria.this, FrasesVoF_1nivel.class);
                        break;
                    case 2:
                        intent = new Intent(Victoria.this, FrasesVoF_2nivel.class);
                        break;
                    case 3:
                        intent = new Intent(Victoria.this, FrasesVoF_3nivel.class);
                        break;
                    case 4:
                        intent = new Intent(Victoria.this, FrasesVoF_4nivel.class);
                        break;
                    case 5:
                        intent = new Intent(Victoria.this, FrasesVoF_5nivel.class);
                        break;
                    case 6:
                        intent = new Intent(Victoria.this, FrasesVoF_6nivel.class);
                        break;
                    case 7:
                        intent = new Intent(Victoria.this, FrasesVoF_7nivel.class);
                        break;
                    case 8:
                        intent = new Intent(Victoria.this, FrasesVoF_8nivel.class);

                        break;
                    case 9:
                        intent = new Intent(Victoria.this, FrasesVoF_9nivel.class);
                        break;
                    case 10:
                        intent = new Intent(Victoria.this, FrasesVoF_10nivel.class);
                        break;
                    case 11:
                        intent = new Intent(Victoria.this, FrasesVoF_11nivel.class);
                        break;
                    case 12:
                        intent = new Intent(Victoria.this, FrasesVoF_12nivel.class);
                        break;
                    case 13:
                        intent = new Intent(Victoria.this, FrasesVoF_13nivel.class);
                        break;
                    case 14:
                        intent = new Intent(Victoria.this, FrasesVoF_14nivel.class);
                        break;
                    case 15:
                        intent = new Intent(Victoria.this, FrasesVoF_15nivel.class);
                        break;
                        case 16:
                        intent = new Intent(Victoria.this, FrasesVoF_16nivel.class);
                        break;
                    case 17:
                        intent = new Intent(Victoria.this, niveles_frasesvof.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });
    }



    public void Todos_Los_Niveles(View view){
        Intent intent=new Intent(Victoria.this,niveles_frasesvof.class);
        startActivity(intent);
    }



}
package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import org.w3c.dom.Text;

public class niveles_adivina_la_palabra extends AppCompatActivity {

    private TextView puntostext;
    private int puntuajeTotal;
    private ImageView buttonPanelMinijuegos;
    private ImageButton imb02, imb03, imb04, imb05,imb06,imb07,imb08,imb09,imb10,imb11,imb12,imb13,imb14,imb15,imb16;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_niveles_adivina_la_palabra);

        puntostext=(TextView)findViewById(R.id.puntuaje_total_adivina_la_palabra);

        buttonPanelMinijuegos = findViewById(R.id.button_panel_minijuegos);

        buttonPanelMinijuegos.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(niveles_adivina_la_palabra.this, Panel_Minijuegos.class);
                startActivity(intent);
            }
        });

        // Obtener la puntuación del jugador actual desde la base de datos
        AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
        SQLiteDatabase db = admin.getReadableDatabase();
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String savedNames = preferences.getString("nombreJugadorActual", "");
        Cursor cursor = db.query("datos", new String[]{"puntuacionCadenaNum"}, "nombre=?", new String[]{savedNames}, null, null, null);
        int puntuacionAdivina = 0;
        if (cursor.moveToFirst()) {
            puntuacionAdivina = cursor.getInt(0);
        }
        cursor.close();
        db.close();

        puntostext.setText(String.valueOf(puntuacionAdivina));

        SharedPreferences.Editor editor = preferences.edit();
        editor.putInt("puntuacion", puntuacionAdivina);
        editor.apply();

        cargarTablero();
        comprobar();


        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        // Obtener el nombre de usuario actual desde SharedPreferences

        String nombreJugadorActual = preferences.getString("nombreJugadorActual", "");

        // Obtener una instancia de SharedPreferences única para el usuario actual
        SharedPreferences nivelesPreferences = getSharedPreferences(nombreJugadorActual + "_NivelesFrasesVoF", MODE_PRIVATE);

        // Obtener el nombre de usuario actual y establecerlo en la vista de texto correspondiente
        TextView jugador = findViewById(R.id.jugador);
        jugador.setText(nombreJugadorActual);



    }

    @Override
    public void onResume() {
        super.onResume();
        SharedPreferences preferences =getSharedPreferences("myPrefs", MODE_PRIVATE);
        int savedPuntuacion = preferences.getInt("puntuacion", 0);
        puntostext.setText(String.valueOf(savedPuntuacion));

    }


    private void cargarTablero() {

        imb02 = findViewById(R.id.boton02);
        imb03 = findViewById(R.id.boton03);
        imb04 = findViewById(R.id.boton04);
        imb05 = findViewById(R.id.boton05);
        imb06 = findViewById(R.id.boton06);
        imb07 = findViewById(R.id.boton07);
        imb08 = findViewById(R.id.boton08);
        imb09 = findViewById(R.id.boton09);
        imb10 = findViewById(R.id.boton10);
        imb11 = findViewById(R.id.boton11);
        imb12 = findViewById(R.id.boton12);
        imb13 = findViewById(R.id.boton13);
        imb14 = findViewById(R.id.boton14);
        imb15 = findViewById(R.id.boton15);
        imb16 = findViewById(R.id.boton16);


    }

    private void comprobar() {

        AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
        SQLiteDatabase db= admin.getReadableDatabase();
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String savedNames = preferences.getString("nombreJugadorActual", "");
        Cursor cursor = db.query("datos", new String[]{"nivel_maxAdivina"}, "nombre=?", new String[]{savedNames}, null, null, null);
        int nivelestado = 0;
        if (cursor.moveToFirst()) {
            nivelestado = cursor.getInt(0);
        }
        cursor.close();
        db.close();

        if (nivelestado == 2 ) {

            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });


        }

        if (nivelestado == 3 ) {

            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);
                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });


        }

        if (nivelestado == 4 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);


                    startActivity(intent);
                }
            });


        }

        if (nivelestado == 5 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);


                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);


                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap4);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });


        }

        if (nivelestado == 6 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);


                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);


                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

        }

        if (nivelestado == 7 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });




        }

        if (nivelestado == 8 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });

            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap8 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap8 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });




        }

        if (nivelestado == 8 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });


            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap9 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap9 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });




        }

        if (nivelestado == 9 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);


                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });


            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap9 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap9 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);

            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });

            imb09.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap10 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap10 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb09.setImageBitmap(resizedBitmap);

            imb09.setEnabled(true);

            imb09.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });




        }

        if (nivelestado == 10 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);
                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);
                    startActivity(intent);
                }
            });

            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap8 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap8 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });


            imb09.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap10 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap10 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb09.setImageBitmap(resizedBitmap);

            imb09.setEnabled(true);

            imb09.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });

            imb10.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap11 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap11 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb10.setImageBitmap(resizedBitmap);

            imb10.setEnabled(true);

            imb10.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra10.class);

                    startActivity(intent);
                }
            });

        }

        if (nivelestado == 11 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });

            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap8 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap8 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });


            imb09.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap10 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap10 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb09.setImageBitmap(resizedBitmap);

            imb09.setEnabled(true);

            imb09.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });




            imb10.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap90 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap90 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb10.setImageBitmap(resizedBitmap);

            imb10.setEnabled(true);

            imb10.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra10.class);

                    startActivity(intent);
                }
            });

            imb11.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap11 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap11 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb11.setImageBitmap(resizedBitmap);

            imb11.setEnabled(true);

            imb11.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra11.class);

                    startActivity(intent);
                }
            });

        }


        if (nivelestado == 12 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });

            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap8 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap8 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });

            imb09.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap9 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap9 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb09.setImageBitmap(resizedBitmap);


            imb09.setEnabled(true);

            imb09.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });

            imb10.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap10 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap10 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb10.setImageBitmap(resizedBitmap);

            imb10.setEnabled(true);

            imb10.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra10.class);

                    startActivity(intent);
                }
            });

            imb11.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap11 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap11 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb11.setImageBitmap(resizedBitmap);

            imb11.setEnabled(true);

            imb11.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra11.class);

                    startActivity(intent);
                }
            });

            imb12.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap91 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap92 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb12.setImageBitmap(resizedBitmap);

            imb12.setEnabled(true);

            imb12.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra12.class);

                    startActivity(intent);
                }
            });

        }

        if (nivelestado == 13 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });

            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap8 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap8 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });

            imb09.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap9 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap9 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb09.setImageBitmap(resizedBitmap);


            imb09.setEnabled(true);

            imb09.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });

            imb10.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap10 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap10 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb10.setImageBitmap(resizedBitmap);

            imb10.setEnabled(true);

            imb10.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra10.class);

                    startActivity(intent);
                }
            });

            imb11.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap11 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap11 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb11.setImageBitmap(resizedBitmap);

            imb11.setEnabled(true);

            imb11.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra11.class);

                    startActivity(intent);
                }
            });

            imb12.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap91 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap92 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb12.setImageBitmap(resizedBitmap);

            imb12.setEnabled(true);

            imb12.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra12.class);

                    startActivity(intent);
                }
            });

            imb13.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap96 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap96 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb13.setImageBitmap(resizedBitmap);

            imb13.setEnabled(true);

            imb13.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra13.class);
                    startActivity(intent);
                }
            });

        }

        if (nivelestado == 14 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });

            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap8 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap8 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });

            imb09.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap9 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap9 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb09.setImageBitmap(resizedBitmap);


            imb09.setEnabled(true);

            imb09.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });

            imb10.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap10 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap10 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb10.setImageBitmap(resizedBitmap);

            imb10.setEnabled(true);

            imb10.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra10.class);

                    startActivity(intent);
                }
            });

            imb11.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap11 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap11 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb11.setImageBitmap(resizedBitmap);

            imb11.setEnabled(true);

            imb11.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra11.class);

                    startActivity(intent);
                }
            });

            imb12.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap91 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap92 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb12.setImageBitmap(resizedBitmap);

            imb12.setEnabled(true);

            imb12.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra12.class);

                    startActivity(intent);
                }
            });

            imb13.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap96 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap96 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb13.setImageBitmap(resizedBitmap);

            imb13.setEnabled(true);

            imb13.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra13.class);

                    startActivity(intent);
                }
            });

            imb14.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap97 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap97 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb14.setImageBitmap(resizedBitmap);

            imb14.setEnabled(true);

            imb14.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra14.class);

                    startActivity(intent);
                }
            });

        }

        if (nivelestado == 15 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });

            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap8 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap8 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });

            imb09.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap9 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap9 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb09.setImageBitmap(resizedBitmap);


            imb09.setEnabled(true);

            imb09.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });

            imb10.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap10 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap10 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb10.setImageBitmap(resizedBitmap);

            imb10.setEnabled(true);

            imb10.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra10.class);

                    startActivity(intent);
                }
            });

            imb11.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap11 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap11 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb11.setImageBitmap(resizedBitmap);

            imb11.setEnabled(true);

            imb11.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra11.class);

                    startActivity(intent);
                }
            });

            imb12.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap91 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap92 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb12.setImageBitmap(resizedBitmap);

            imb12.setEnabled(true);

            imb12.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra12.class);

                    startActivity(intent);
                }
            });

            imb13.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap96 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap96 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb13.setImageBitmap(resizedBitmap);

            imb13.setEnabled(true);

            imb13.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra13.class);

                    startActivity(intent);
                }
            });

            imb14.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap97 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap97 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb14.setImageBitmap(resizedBitmap);

            imb14.setEnabled(true);

            imb14.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra14.class);

                    startActivity(intent);
                }
            });

            imb15.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap98 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap98 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb15.setImageBitmap(resizedBitmap);

            imb15.setEnabled(true);

            imb15.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra15.class);

                    startActivity(intent);
                }
            });

        }

        if (nivelestado == 16 ) {


            imb02.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb02.setImageBitmap(resizedBitmap);


            imb02.setEnabled(true);

            imb02.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra2.class);

                    startActivity(intent);
                }
            });

            imb03.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap1 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap1 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb03.setImageBitmap(resizedBitmap);


            imb03.setEnabled(true);

            imb03.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra3.class);

                    startActivity(intent);
                }
            });

            imb04.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap3 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap3 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb04.setImageBitmap(resizedBitmap);


            imb04.setEnabled(true);

            imb04.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra4.class);

                    startActivity(intent);
                }
            });

            imb05.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap4 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap4 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb05.setImageBitmap(resizedBitmap);


            imb05.setEnabled(true);

            imb05.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra5.class);

                    startActivity(intent);
                }
            });

            imb06.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap5 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap5 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb06.setImageBitmap(resizedBitmap);


            imb06.setEnabled(true);

            imb06.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra6.class);

                    startActivity(intent);
                }
            });

            imb07.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap7 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap7 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb07.setImageBitmap(resizedBitmap);


            imb07.setEnabled(true);

            imb07.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra7.class);

                    startActivity(intent);
                }
            });

            imb08.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap8 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap8 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb08.setImageBitmap(resizedBitmap);


            imb08.setEnabled(true);

            imb08.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra8.class);

                    startActivity(intent);
                }
            });

            imb09.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap9 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap9 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb09.setImageBitmap(resizedBitmap);


            imb09.setEnabled(true);

            imb09.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra9.class);

                    startActivity(intent);
                }
            });

            imb10.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap10 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap10 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb10.setImageBitmap(resizedBitmap);

            imb10.setEnabled(true);

            imb10.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra10.class);

                    startActivity(intent);
                }
            });

            imb11.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap11 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap11 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb11.setImageBitmap(resizedBitmap);

            imb11.setEnabled(true);

            imb11.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra11.class);

                    startActivity(intent);
                }
            });

            imb12.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap91 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap92 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb12.setImageBitmap(resizedBitmap);

            imb12.setEnabled(true);

            imb12.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra12.class);

                    startActivity(intent);
                }
            });

            imb13.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap96 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap96 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb13.setImageBitmap(resizedBitmap);

            imb13.setEnabled(true);

            imb13.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra13.class);

                    startActivity(intent);
                }
            });

            imb14.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap97 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap97 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb14.setImageBitmap(resizedBitmap);

            imb14.setEnabled(true);

            imb14.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra14.class);

                    startActivity(intent);
                }
            });

            imb15.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap98 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap98 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb15.setImageBitmap(resizedBitmap);

            imb15.setEnabled(true);

            imb15.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra15.class);

                    startActivity(intent);
                }
            });

            imb16.setImageResource(R.drawable.icono_level_availible);
            Bitmap originalBitmap99 = BitmapFactory.decodeResource(getResources(), R.drawable.icono_level_availible);
            Bitmap resizedBitmap99 = Bitmap.createScaledBitmap(originalBitmap, 165, 200, true);
            imb16.setImageBitmap(resizedBitmap);

            imb16.setEnabled(true);

            imb16.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // Aquí puedes agregar el código para navegar a la nueva actividad
                    Intent intent = new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra16.class);

                    startActivity(intent);
                }
            });

        }




    }







    public void nivel1(View view){
        Intent i =new Intent(niveles_adivina_la_palabra.this,AdivinaLaPalabra1.class);
        startActivity(i);


    }
}


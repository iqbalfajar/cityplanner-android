package com.muzavan.userpc.cityplanner;

import android.content.Intent;
import android.graphics.AvoidXfermode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class ModeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mode);

        Button buttonCityBuildMode = (Button) findViewById(R.id.buttonCityBuildMode);
        Button buttonCityWatchMode = (Button) findViewById(R.id.buttonCityWatchMode);

        buttonCityBuildMode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ModeActivity.this,CityActivity.class);
                intent.putExtra("city_build",true);
                startActivity(intent);
                finish();
            }
        });

        buttonCityWatchMode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ModeActivity.this, CityActivity.class);
                intent.putExtra("city_build",false);
                startActivity(intent);
                finish();
            }
        });


    }
}

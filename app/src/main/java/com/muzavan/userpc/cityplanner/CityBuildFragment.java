package com.muzavan.userpc.cityplanner;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

/**
 * Created by user pc on 4/26/2016.
 */
public class CityBuildFragment extends Fragment {
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        final View out =  inflater.inflate(R.layout.fragment_city_build,container,false);
        TextView map_box = (TextView) out.findViewById(R.id.map_box);
        map_box.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(out.getContext(), DetailActivity.class);
                startActivity(intent);
            }
        });
        return out;
    }
}

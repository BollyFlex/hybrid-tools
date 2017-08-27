/* 
* OUD stat permutation generator tool
* ************************************
*
*/
(function(){
	$(document).on('ready',function(){

		var m_NumStatsPerGroup = 3;

		var $genBtn = $( '#generate' );

		var m_Outputs = {
			combat: $( '#output-combat' ),
			stealth: $( '#output-stealth' ),
			weapon: $( '#output-weapon' )
		};

		// most 'mediums' are not included, as these stat values are used as defining traits, and as such should be distinctive
		var m_Groups = {
			combat: {
				size: [
					'small',
					'medium-sized',
					'large'
				],
				speed: [
					'static',
					'slow',
					'fast'
				],
				health: [
					'fragile',
					'sturdy',
					'tough'
				],
				aggression: [
					'fearful',
					'passive',
					'aggressive'
				],
				predictability: [
					'predictable',
					'unpredictable'
				],
				attackFrequency: [
					'low attack freq.',
					'high attack freq.'
				],
				painChance: [
					'no pain',
					'frequent pain'
				]
			},
			weapon: {
				transmission: [
					'unarmed',
					'melee',
					'hitscan',
					'projectile',
					'fast projectile'
				],
				power: [
					'weak',
					'powerful'
				],
				accuracy: [
					'inaccurate',
					'accurate'
				]
			},
			stealth: {
				visualRange: [
					'blind',
					'short-range vision',
					'long-range vision'
				],
				fieldOfVision: [
					'narrow F.O.V.',
					'wide F.O.V.'
				],
				nightVision: [
					'no night vision',
					'poor night vision',
					'good night vision'
				],
				hearing: [
					'deaf',
					'poor hearing',
					'good hearing'
				],
				esp: [
					'no ESP',
					'good ESP'
				]
			}
		};

		function m_RandomIntInRange( min, max ){

			return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
		}


		function m_PickRandomElement( arr ){

			var randIdx = m_RandomIntInRange( 0, arr.length - 1 );
			var randElem = arr[ randIdx ];

			return randElem;
		}


		function m_PickRandomProp( obj ){

			var keys = Object.keys( obj );
			var randKeyIdx = m_RandomIntInRange( 0, keys.length - 1 );
			var randKey = keys[ randKeyIdx ];

			return obj[ randKey ];
		}


		function m_GenerateCombo(){

			var blind = false;

			// Choose 1 possible value from each of 2 random stats from each of the 3 groups
			for( var key in m_Groups ){
				if( m_Groups.hasOwnProperty( key ) === true ){

					var group = m_Groups[ key ];
					var $output = m_Outputs[ key ];
					var groupStatKeys = Object.keys( group );
					var slotHtml = '<div class="slot-item">';

					for( var s = 0; s < m_NumStatsPerGroup; s++ ){

						var statKey = groupStatKeys[ s ];
						var randStat = group[ statKey ];
						var randStatVal = m_PickRandomElement( randStat );

						if( blind === true && ( statKey === 'fieldOfVision' || statKey === 'nightVision' ) ){
							
							continue;

						}else if( randStatVal === 'blind' ){
							
							blind = true;
						}

						slotHtml += '<span>' + randStatVal + '</span>';
					}

					slotHtml += '</div>';
					$output.html( slotHtml );
				}
			}
		}


		$genBtn.on( 'click', () => m_GenerateCombo() );


		// For each group
		m_GenerateCombo();
	});
}());